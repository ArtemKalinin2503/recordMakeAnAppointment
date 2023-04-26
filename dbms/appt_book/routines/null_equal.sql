CREATE OR REPLACE FUNCTION appt_book.null_equal (
  arg1 pg_catalog.anyelement,
  agr2 pg_catalog.anyelement
)
RETURNS boolean AS
$body$
select nullif($1, $2) is null and nullif($2, $1) is null
$body$
LANGUAGE 'sql'
IMMUTABLE
CALLED ON NULL INPUT
SECURITY INVOKER
PARALLEL SAFE
COST 100;

ALTER FUNCTION appt_book.null_equal (arg1 pg_catalog.anyelement, agr2 pg_catalog.anyelement)
  OWNER TO appt_user;