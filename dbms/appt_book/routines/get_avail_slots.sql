--список временных окон указанного для, по которым доступна запись на прием
CREATE OR REPLACE FUNCTION appt_book.get_avail_slots (
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
select s.*
  from get_slots(p_day => p_day, p_topic => p_topic) s
  join t_day d
    on d.ck_id = s.ck_day
  join t_dept dp
    on dp.ck_id = d.ck_dept
 where not exists (
    select
      from t_book_que bq
     where bq.ck_time_slot = s.ck_id
       and current_timestamp between bq.ct_create and bq.ct_ttl)
   and not exists (
    select
      from t_appointment a
     where a.ck_time_slot = s.ck_id
       and a.cl_active)
   and current_timestamp at time zone '0' < (d.ck_date + s.ct_st) - format('%s hour', dp.cn_timezone)::interval
$body$
LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_avail_slots (p_day uuid, p_topic uuid)
  OWNER TO appt_user;