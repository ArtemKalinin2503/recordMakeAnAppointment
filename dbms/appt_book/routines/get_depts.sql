--список подразделений организации
CREATE OR REPLACE FUNCTION appt_book.get_depts (
  p_org uuid,
  p_topic uuid = NULL::uuid
)
RETURNS SETOF appt_book.t_dept AS'
SELECT d.*
  from t_dept d
 where d.ck_org = p_org
   and d.cl_active
   and d.cv_app_avail
   and (p_topic is null or
   exists (
     select
       from t_dept_topic dt
      where dt.ck_dept = d.ck_id
        and dt.ck_topic = p_topic))
'LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_depts (p_org uuid, p_topic uuid)
  OWNER TO appt_user;