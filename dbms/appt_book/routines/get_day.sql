--день по подразделению и дате
CREATE OR REPLACE FUNCTION appt_book.get_day (
  p_dept uuid,
  p_date date
)
RETURNS uuid AS
$body$
  select d.ck_id
    from t_day d
   where d.cl_active
     and d.ck_dept = p_dept
     and d.ck_date = p_date;
$body$ 
LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_day (
  p_dept uuid,
  p_date date
) OWNER TO appt_user;