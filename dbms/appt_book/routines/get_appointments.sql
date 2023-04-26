--список записей на прием (пока только для грида, пагинация/фильтрация организуется вовне вызывающим)
CREATE OR REPLACE FUNCTION appt_book.get_appointments (
)
RETURNS TABLE (
  ck_id uuid,
  ck_time_slot uuid,
  cv_client_surname text,
  cv_client_name text,
  cv_client_patronymic text,
  cv_mobilephone text,
  cv_email text,
  cv_ca_number text,
  cl_email_notif boolean,
  ck_topic uuid,
  cl_active boolean,
  cl_blocked boolean,
  cv_recnum varchar,
  cv_comment text,
  ck_client uuid,
  ck_day uuid,
  cv_ts_name text,
  ct_ts_st time,
  ct_ts_en time,
  cv_topic_name text,
  cv_topic_desc text,
  ck_dept uuid,
  ck_org uuid,
  ck_date date,
  cv_addr text,
  cv_org_name text,
  cv_appt_name varchar
) AS
$body$
select a.ck_id,
       a.ck_time_slot,
       a.cv_client_surname,
       a.cv_client_name,
       a.cv_client_patronymic,
       a.cv_mobilephone,
       a.cv_email,
       a.cv_ca_number,
       a.cl_email_notif,
       a.ck_topic,
       a.cl_active,
       a.cl_blocked,
       a.cv_recnum,
       a.cv_comment,
       a.ck_client,
       ts.ck_day,
       ts.cv_name as cv_ts_name,
       ts.ct_st as ct_ts_st,
       ts.ct_en as ct_ts_en,
       t.cv_name as cv_topic_name,
       t.cv_desc as cv_topic_desc,
       d.ck_dept,
       de.ck_org,
       d.ck_date,
       de.cv_addr as cv_addr,
       o.cv_ofname as cv_org_name,
       get_slot_interv_name(ts.*) cv_appt_name
  from t_appointment a
  join t_time_slot ts
    on ts.ck_id = a.ck_time_slot
  join t_topic t
    on t.ck_id = a.ck_topic
  join t_day d
    on d.ck_id = ts.ck_day
  join t_dept de
    on de.ck_id = d.ck_dept
  join t_org o
    on o.ck_id = de.ck_org
$body$
LANGUAGE 'sql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_appointments ()
  OWNER TO appt_user;