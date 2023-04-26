--удаление дня
CREATE OR REPLACE FUNCTION appt_book.delete_day (
    p_id uuid,
    p_remove boolean default false
)
RETURNS boolean AS
$body$
declare
  rows_aff bigint;
begin
  if p_remove then
    with del as (
    delete
      from t_day t
     where t.ck_id = p_id
    returning *)
    select coalesce(rows_aff, 0) + count(*)
      into strict rows_aff
      from del;
    return rows_aff > 0;
  else
    -- записи на прием
    with upd as (
      update t_appointment t
         set cl_active = false
       where t.cl_active
         and t.ck_time_slot in (
         select ts.ck_id
           from t_time_slot ts
          where ts.ck_day = p_id)
       returning *)
    select coalesce(rows_aff, 0) + count(*)
      into strict rows_aff
      from upd;
    -- временные слоты
    with upd as (
      update t_time_slot
         set cl_active = false
       where cl_active
         and ck_day = p_id
       returning *)
    select coalesce(rows_aff, 0) + count(*)
      into strict rows_aff
      from upd;
    -- дни
    with upd as (
      update t_day
         set cl_active = false
       where cl_active
         and ck_id = p_id
       returning *)
    select coalesce(rows_aff, 0) + count(*)
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

ALTER FUNCTION appt_book.delete_day (
    p_id uuid,
    p_remove boolean
) OWNER TO appt_user;
