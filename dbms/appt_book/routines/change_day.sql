--редактирование дня
CREATE OR REPLACE FUNCTION appt_book.change_day (
    p_id uuid,
    p_dept uuid,
    p_date date,
    p_time_intersect_ctrl boolean,
    p_avail boolean
)
RETURNS boolean AS
$body$
declare
begin
  update t_day
     set ck_dept = p_dept,
         ck_date = p_date,
         cl_time_intersect_ctrl = p_time_intersect_ctrl,
         cl_avail = p_avail
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

ALTER FUNCTION appt_book.change_day (
    p_id uuid,
    p_dept uuid,
    p_date date,
    p_time_intersect_ctrl boolean,
    p_avail boolean
) OWNER TO appt_user;