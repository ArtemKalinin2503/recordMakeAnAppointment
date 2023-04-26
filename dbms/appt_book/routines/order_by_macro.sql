CREATE OR REPLACE FUNCTION appt_book.order_by_macro (
  p_orders text
)
RETURNS text AS
$body$
select case when v_order is null then '' else 'order by ' || v_order end
  from (select nullif(trim( e'\t\n\r\ ' from p_orders), '') as v_order) t
$body$
LANGUAGE 'sql'
IMMUTABLE
CALLED ON NULL INPUT
SECURITY INVOKER
PARALLEL SAFE
COST 100;

ALTER FUNCTION appt_book.order_by_macro (p_orders text)
  OWNER TO appt_user;