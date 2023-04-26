--список временных окон по указанному дню
CREATE OR REPLACE FUNCTION appt_book.get_slots (
  p_day uuid,
  p_topic uuid
)
RETURNS TABLE (
  ck_id uuid,
  ck_day uuid,
  cv_name text,
  ct_st time,
  ct_en time,
  ck_topic uuid,
  cl_active boolean,
  cv_appt_name varchar
) AS
$body$
select ts.*, get_slot_interv_name(ts.*) cv_appt_name
  from t_time_slot ts
 right join t_topic t
    on t.cl_spec
   and t.ck_id = ts.ck_topic
    or not t.cl_spec
   and ts.ck_topic is null
 where ts.cl_active
   and ts.ck_day = p_day
   and t.ck_id = p_topic
$body$
LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_slots (p_day uuid, p_topic uuid)
  OWNER TO appt_user;