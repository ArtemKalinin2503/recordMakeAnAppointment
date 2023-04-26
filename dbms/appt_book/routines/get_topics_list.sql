drop function if exists appt_book.get_topics_list;
CREATE OR REPLACE FUNCTION appt_book.get_topics_list (
  p_org uuid,
  p_dept uuid default null,
  p_page bigint default 1,
  p_page_limit bigint default 10,
  p_order varchar default null,
  p_id uuid default null
) RETURNS table (
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
  cnt_total bigint
) AS
$body$
begin
  return query execute replace(
$query$
  with iv_data as (
    select t.*,
           bool_yes(t.cl_serfserv) as cv_selfserv,
           bool_yes(t.cl_avail) as cv_avail,
           bool_yes(t.cl_spec) as cv_spec,
           bool_active(t.cl_active) as cv_active,
           count(*) over () cnt_total
      from get_topics(p_org => $1, p_dept => $2) t
     where (t.ck_id = $5 or $5 is null)
     &orderby
  )
  select d.*
    from iv_data d
  offset ((($3 - 1) * $4)::bigint) rows 
  fetch next ($4::bigint) rows only
$query$, '&orderby', order_by_macro(p_order)) using p_org, p_dept, p_page, p_page_limit, p_id;
end;
$body$
LANGUAGE plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_topics_list (
  p_org uuid,
  p_dept uuid,
  p_page bigint,
  p_page_limit bigint,
  p_order varchar,
  p_id uuid
) OWNER TO appt_user;