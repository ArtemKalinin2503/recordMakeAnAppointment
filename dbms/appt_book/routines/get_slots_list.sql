drop function if exists appt_book.get_slots_list;
CREATE OR REPLACE FUNCTION appt_book.get_slots_list (
  p_day uuid,
  p_page bigint default 1,
  p_page_limit bigint default 10,
  p_order varchar default null,
  p_id uuid default null
) RETURNS table (
  ck_id uuid,
  cv_name text,
  cv_slot_st text,
  cv_slot_en text,
  ck_topic uuid,
  cv_topic_name text,
  cl_active boolean,
  cv_active varchar,
  ck_appointment_id uuid,
  cnt_total bigint
) AS
$body$
begin
  return query execute replace(
$query$
  with iv_data as (
    select ts.ck_id,
           ts.cv_name,
           to_char(ts.ct_st, 'hh24:mi') as cv_slot_st,
           to_char(ts.ct_en, 'hh24:mi') as cv_slot_en,
           ts.ck_topic,
           t.cv_name as cv_topic_name,
           ts.cl_active,
           bool_active(ts.cl_active) as cv_active,
           a.ck_id as ck_appointment_id,
           count(*) over () cnt_total
      from t_time_slot ts
      left join t_topic t
        on t.ck_id = ts.ck_topic
      left join t_appointment a
        on a.ck_time_slot = ts.ck_id
     where ts.cl_active
       and ts.ck_day = $1
       and (ts.ck_id = $4 or $4 is null)
       and true
     &orderby
  )
  select d.*
    from iv_data d
  offset ((($2 - 1) * $3)::bigint) rows 
  fetch next ($3::bigint) rows only
$query$, '&orderby', order_by_macro(p_order)) using p_day, p_page, p_page_limit, p_id;
end;
$body$
LANGUAGE plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_slots_list (
  p_day uuid,
  p_page bigint,
  p_page_limit bigint,
  p_order varchar,
  p_id uuid
) OWNER TO appt_user;