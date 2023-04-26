--редактирование слота
CREATE OR REPLACE FUNCTION appt_book.change_slot (
    p_id uuid,
    p_day uuid,
    p_name text,
    p_st time,
    p_en time,
    p_topic uuid
)
RETURNS boolean AS
$body$
declare
begin
  update t_time_slot 
     set ck_day = p_day,
         cv_name = p_name,
         ct_st = p_st,
         ct_en = p_en,
         ck_topic = p_topic
   where ck_id = p_id;
  return true;
exception
  when others then
    return false;
end;
$body$ language plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.change_slot (
    p_id uuid,
    p_day uuid,
    p_name text,
    p_st time,
    p_en time,
    p_topic uuid
) OWNER TO appt_user;