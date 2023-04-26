--создание дня
CREATE OR REPLACE FUNCTION appt_book.add_day (
    p_dept uuid,
    p_date date,
    p_time_intersect_ctrl boolean,
    p_avail boolean
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
  ) values (
    p_dept,
    p_date,
    p_time_intersect_ctrl,
    p_avail
  ) returning ck_id into result;
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

ALTER FUNCTION appt_book.add_day (
    p_dept uuid,
    p_date date,
    p_time_intersect_ctrl boolean,
    p_avail boolean
) OWNER TO appt_user;