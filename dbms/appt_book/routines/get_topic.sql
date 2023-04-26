CREATE OR REPLACE FUNCTION appt_book.get_topic (
  p_id uuid
)
RETURNS TABLE (
  ck_id uuid,
  ck_org uuid,
  cv_name text,
  cv_desc text,
  cl_serfserv boolean,
  cl_avail boolean,
  cl_spec boolean,
  cl_active boolean,
  cv_selfserv varchar,
  cv_avail varchar,
  cv_spec varchar,
  cv_active varchar,
  ck_depts uuid[]
) AS
$body$
select t.*,
       bool_yes(t.cl_serfserv) as cv_selfserv,
       bool_yes(t.cl_avail) as cv_avail,
       bool_yes(t.cl_spec) as cv_spec,
       bool_active(t.cl_active) as cv_active,
       coalesce(d.ck_depts, array[]::uuid[]) as ck_depts
  from t_topic t
  left join lateral (
    select array_agg(dt.ck_dept) as ck_depts
      from t_dept_topic dt
     where dt.ck_topic = t.ck_id) d
    on true
 where t.cl_active
   and t.ck_id = p_id
$body$
LANGUAGE sql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_topic (
  p_id uuid
) OWNER TO appt_user;