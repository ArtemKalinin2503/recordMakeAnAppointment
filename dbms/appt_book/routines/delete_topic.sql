--удаление темы организации
CREATE OR REPLACE FUNCTION appt_book.delete_topic (
    p_id uuid,
    p_remove boolean default false
)
RETURNS boolean AS
$body$
declare
  rows_aff bigint;
begin
  if p_remove then
    delete
      from t_dept_topic t
     where t.ck_topic = p_id;
    with del as (
    delete
      from t_topic t
     where t.ck_id = p_id
    returning *)
    select count(*)
      into strict rows_aff
      from del;
    return rows_aff > 0;
  else
    with upd as (
      update t_topic
         set cl_active = false
       where ck_id = p_id
         and cl_active
       returning *)
    select count(*)
      into strict rows_aff
      from upd;
    return rows_aff > 0;
  end if;
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

ALTER FUNCTION appt_book.delete_topic (
    p_id uuid,
    p_remove boolean
) OWNER TO appt_user;
