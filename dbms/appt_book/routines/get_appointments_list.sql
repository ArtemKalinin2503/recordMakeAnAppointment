drop function if exists appt_book.get_appointments_list (
  p_org uuid,
  p_dept uuid,
  p_date_from date,
  p_date_to date,
  p_page bigint,
  p_page_limit bigint,
  p_id uuid,
  p_order varchar
);
CREATE OR REPLACE FUNCTION appt_book.get_appointments_list (
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
begin
  return query execute replace(
$query$
  with iv_data as (
    select t.*,
           bool_yes(t.cl_email_notif) as cv_email_notif,
           bool_active(t.cl_active) as cv_active,
           bool_yes(t.cl_blocked) as cv_blocked,
           get_weekday(t.ck_date) as cv_weekday,
           count(*) over () cnt_total
      from get_appointments() t
     where (t.ck_org = $1 or $1 is null)
       and (t.ck_dept = $2 or $2 is null)
       and (t.ck_date >= $3 or $3 is null)
       and (t.ck_date <= $4 or $4 is null)
       and (t.ck_id = $5 or $5 is null)
     &orderby
  )
  select d.ck_id,
  		 d.ck_time_slot,
  		 d.cv_client_surname,
  		 d.cv_client_name,
  		 d.cv_client_patronymic,
  		 d.cv_mobilephone,
  		 d.cv_email,
  		 d.cv_ca_number,
  		 d.cl_email_notif,
  		 d.ck_topic,
  		 d.cl_active,
  		 d.cl_blocked,
  		 d.cv_recnum,
  		 d.cv_comment,
  		 d.ck_client,
  		 d.ck_day,
  		 d.cv_ts_name,
  		 d.ct_ts_st,
  		 d.ct_ts_en,
  		 d.cv_topic_name,
  		 d.cv_topic_desc,
  		 d.ck_dept,
  		 d.ck_org,
  		 d.ck_date,
  		 d.cv_addr,
  		 d.cv_org_name,
  		 d.cv_appt_name,
  		 d.cv_email_notif,
  		 d.cv_active,
  		 d.cv_blocked,
  		 d.cv_weekday,
  		 d.cnt_total
    from iv_data d
  offset ((($6 - 1) * $7)::bigint) rows 
  fetch next ($7::bigint) rows only
$query$, '&orderby', order_by_macro(p_order)) using p_org, p_dept, p_date_from, p_date_to, p_id, p_page, p_page_limit;
end;
$body$
LANGUAGE plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_appointments_list (
  p_org uuid,
  p_dept uuid,
  p_date_from date,
  p_date_to date,
  p_page bigint,
  p_page_limit bigint,
  p_id uuid,
  p_order varchar
) OWNER TO appt_user;