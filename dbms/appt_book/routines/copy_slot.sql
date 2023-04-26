--копирование слота
CREATE OR REPLACE FUNCTION appt_book.copy_slot (
    p_id_from uuid,
    p_st time,
    p_en time
)
RETURNS uuid AS
$body$
declare
  result uuid;
begin
  insert into t_time_slot (
    ck_day,
    cv_name,
    ct_st,
    ct_en,
    ck_topic
  )
  select t.ck_day,
         t.ck_name,
         p_st,
         p_en,
         t.ck_topic
    from t_time_slot t
   where t.ck_id = p_id_from
  returning ck_id into result;
  return result;
exception
  when others then
    return uuid_nil();
end;
$body$ language plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.copy_slot (
    p_id_from uuid,
    p_st time,
    p_en time
) OWNER TO appt_user;