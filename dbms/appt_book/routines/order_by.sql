CREATE OR REPLACE FUNCTION appt_book.order_by (
  p_field varchar [],
  p_direction varchar [],
  p_nulls varchar []
)
RETURNS text AS
$body$
select string_agg(format(E'%I%s%s',
         _field,
         case when _direction is not null then ' ' || lower(_direction) end,
         case when _nulls is not null then ' nulls ' || lower(_nulls) end
       ), ', ')
  from unnest(p_field, p_direction, p_nulls) t(_field, _direction, _nulls)
 where _field is not null
   and (lower(_direction) in ('asc', 'desc') or _direction is null)
   and (lower(_nulls) in ('first', 'last') or _nulls is null)
$body$
LANGUAGE 'sql'
IMMUTABLE
CALLED ON NULL INPUT
SECURITY INVOKER
PARALLEL SAFE
COST 100;

ALTER FUNCTION appt_book.order_by (p_field varchar [], p_direction varchar [], p_nulls varchar [])
  OWNER TO appt_user;