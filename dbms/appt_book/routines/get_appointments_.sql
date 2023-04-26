drop function if exists appt_book.get_appointments (
  p_org uuid,
  p_dept uuid,
  p_date_from date,
  p_date_to date,
  p_page bigint,
  p_page_limit bigint,
  p_id uuid,
  p_order varchar
);
CREATE OR REPLACE FUNCTION appt_book.get_appointments (
  p_org uuid,
  p_dept uuid,
  p_date_from date,
  p_date_to date,
  p_page bigint,
  p_page_limit bigint,
  p_id uuid,
  p_order varchar default null
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
  cv_appt_name varchar,
  cv_email_notif varchar,
  cv_active varchar,
  cv_blocked varchar,
  cv_weekday varchar,
  cnt_total bigint
) AS
$body$
  /*устаревшая функция, нужна только для обратной совместимости. По возможности использовать get_appointments_list вместо неё*/
  select t.*
    from get_appointments_list(
      p_org => p_org,
      p_dept => p_dept,
      p_date_from => p_date_from,
      p_date_to => p_date_to,
      p_page => p_page,
      p_page_limit => p_page_limit,
      p_id => p_id,
      p_order => p_order
    ) t;
$body$
LANGUAGE sql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_appointments (
  p_org uuid,
  p_dept uuid,
  p_date_from date,
  p_date_to date,
  p_page bigint,
  p_page_limit bigint,
  p_id uuid,
  p_order varchar
) OWNER TO appt_user;