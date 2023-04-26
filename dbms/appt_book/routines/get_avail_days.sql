-- список дней, по которым возможна запись на прием
CREATE OR REPLACE FUNCTION appt_book.get_avail_days (
  p_dept uuid,
  p_topic uuid
)
RETURNS SETOF appt_book.t_day AS'
select d.*
  from get_days(p_dept) d
 where exists (
    select from get_avail_slots(d.ck_id, p_topic))
'LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_avail_days (p_dept uuid, p_topic uuid)
  OWNER TO appt_user;