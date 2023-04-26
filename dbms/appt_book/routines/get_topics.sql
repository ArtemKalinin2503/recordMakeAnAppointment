--список тем организации/подразделения
CREATE OR REPLACE FUNCTION appt_book.get_topics (
  p_org uuid,
  p_dept uuid = NULL::uuid,
  p_spec boolean = null::boolean
)
RETURNS SETOF appt_book.t_topic AS
$body$
select t.*
  from t_topic t
 where t.cl_active
   and t.ck_org = p_org
   and nullif(p_spec, t.cl_spec) is null -- сравнивать cl_spec = p_spec при наличии указанного p_spec
   and (p_dept is null or
   exists (
     select
       from t_dept_topic dt
      where t.ck_id = dt.ck_topic
        and dt.ck_dept = p_dept))
$body$
LANGUAGE sql
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_topics (
  p_org uuid,
  p_dept uuid,
  p_spec boolean
) OWNER TO appt_user;