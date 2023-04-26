--копирование дня
CREATE OR REPLACE FUNCTION appt_book.copy_day (
    p_id_from uuid,
    p_date date
)
RETURNS uuid AS
$body$
declare
  result uuid;
begin
  insert into t_day (
    ck_dept,
    ck_date,
    cl_time_intersect_ctrl,
    cl_avail
  )
  select t.ck_dept,
         p_date,
         t.cl_time_intersect_ctrl,
         t.cl_avail
    from t_day t
   where t.ck_id = p_id_from
  returning ck_id into result;
  insert into t_time_slot (
    ck_day,
    cv_name,
    ct_st,
    ct_en,
    ck_topic
  )
  select result,
         t.cv_name,
         t.ct_st,
         t.ct_en,
         t.ck_topic
    from t_time_slot t
   where t.cl_active
     and t.ck_day = p_id_from;
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

ALTER FUNCTION appt_book.copy_day (
    p_id_from uuid,
    p_date date
) OWNER TO appt_user;