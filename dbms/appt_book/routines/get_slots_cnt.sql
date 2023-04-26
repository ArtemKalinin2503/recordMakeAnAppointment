CREATE OR REPLACE FUNCTION appt_book.get_slots_cnt (
  p_day uuid,
  p_topic uuid = NULL::uuid
)
RETURNS bigint AS
$body$
select count(*)
  from t_time_slot t
 where t.ck_day = p_day
   and (t.ck_topic = p_topic or p_topic is null)
   and t.cl_active
$body$
LANGUAGE 'sql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_slots_cnt (p_day uuid, p_topic uuid)
  OWNER TO appt_user;