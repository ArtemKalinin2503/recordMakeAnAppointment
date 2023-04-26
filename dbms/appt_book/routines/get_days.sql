--список дней для записи на прием
CREATE OR REPLACE FUNCTION appt_book.get_days (
  p_dept uuid
)
RETURNS SETOF appt_book.t_day AS'
SELECT d.*
  from t_day d
 where d.cl_avail
   and d.cl_active
   and d.ck_dept = p_dept
'LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_days (p_dept uuid)
  OWNER TO appt_user;