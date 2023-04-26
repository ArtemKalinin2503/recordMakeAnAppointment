--установка блокировки временного окна
CREATE OR REPLACE FUNCTION appt_book.set_lock (
  p_client uuid,
  p_slot uuid
)
RETURNS uuid AS'
declare
  v_lock_int constant interval := interval ''10 minutes'';
  v_ex boolean;
  result uuid;
begin
    -- Активная Запись на прием по указанному слоту уже есть?
    select exists (select from t_appointment a where a.ck_time_slot = p_slot and a.cl_active) into v_ex;
    -- записи нет, пробуем блокировать слот
    if not v_ex then
    begin
    	-- удаляем устаревшие блокировки слота, либо неустаревшую блокировку того же клиента
    	delete from t_book_que q
         where q.ck_time_slot = p_slot
           and (q.ct_ttl < current_timestamp or q.ck_client = p_client);
        -- блокируем слот
        insert into t_book_que(ck_time_slot, ck_client, ct_create, ct_ttl)
        values(p_slot, p_client, current_timestamp, current_timestamp + v_lock_int) returning ck_time_slot into result;
    exception
        when unique_violation or integrity_constraint_violation then
        	-- нулевой uid при невозможности блокировки
            select uuid_nil() into result;
    end;
    else
    	-- нельзя установить блокировку по слоту с активной записью на прием
        select uuid_nil() into result;
    end if;
    return result;
end;
'LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.set_lock (p_client uuid, p_slot uuid)
  OWNER TO appt_user;