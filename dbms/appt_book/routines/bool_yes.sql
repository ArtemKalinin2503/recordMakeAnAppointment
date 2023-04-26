CREATE OR REPLACE FUNCTION appt_book.bool_yes (
  p_val boolean
)
RETURNS varchar AS
$body$
select case when p_val is not null then case when p_val then 'Да' else 'Нет' end end::varchar
$body$
LANGUAGE 'sql'
IMMUTABLE
CALLED ON NULL INPUT
SECURITY INVOKER
PARALLEL SAFE
COST 100;

ALTER FUNCTION appt_book.bool_yes (p_val boolean)
  OWNER TO appt_user;