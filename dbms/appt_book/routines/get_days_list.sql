drop function if exists appt_book.get_days_list;
CREATE OR REPLACE FUNCTION appt_book.get_days_list (
  p_dept uuid,
  p_dt_st date default null,
  p_dt_en date default null,
  p_page bigint default 1,
  p_page_limit bigint default 10,
  p_order varchar default null,
  p_id uuid default null
) RETURNS table (
  ck_id uuid,
  ck_dept uuid,
  ck_date date,
  cl_time_intersect_ctrl boolean,
  cl_avail boolean,
  cl_active boolean,
  cv_time_intersect_ctrl varchar,
  cv_avail varchar,
  cv_active varchar,
  cv_weekday varchar,
  slots_count bigint,
  appts_count bigint,
  cnt_total bigint
) AS
$body$
begin
  return query execute replace(
$query$
  with iv_data as (
    select d.*,
           bool_yes(d.cl_time_intersect_ctrl) as cv_time_intersect_ctrl,
           bool_yes(d.cl_avail) as cv_avail,
           bool_active(d.cl_active) as cv_active,
           get_weekday(d.ck_date) cv_weekday,
           get_slots_cnt(d.ck_id) as slots_count,
           get_appts_cnt(d.ck_id) as appts_count,
           count(*) over () cnt_total
      from t_day d
     where d.cl_active
       and d.ck_dept = $1
       and (d.ck_date >= $2 or $2 is null)
       and (d.ck_date <= $3 or $3 is null)
       and (d.ck_id = $6 or $6 is null)
     &orderby
  )
  select d.*
    from iv_data d
  offset ((($4 - 1) * $5)::bigint) rows 
  fetch next ($5::bigint) rows only
$query$, '&orderby', order_by_macro(p_order)) using p_dept, p_dt_st, p_dt_en, p_page, p_page_limit, p_id;
end;
$body$
LANGUAGE plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_days_list (
  p_dept uuid,
  p_dt_st date,
  p_dt_en date,
  p_page bigint,
  p_page_limit bigint,
  p_order varchar,
  p_id uuid
) OWNER TO appt_user;