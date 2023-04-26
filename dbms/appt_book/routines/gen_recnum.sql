--генератор номеров тикетов по подразделению
CREATE OR REPLACE FUNCTION appt_book.gen_recnum (
  p_dept uuid
)
RETURNS varchar AS'
declare
  c_name constant varchar := ''seq_rn'';
  v_name varchar := format(''%s%s'', c_name, translate(p_dept::text, ''-'', ''''));

  v_seq varchar;
  result varchar;
begin
  execute format(E''create sequence if not exists %I as smallint increment by 1 minvalue 1000 maxvalue 26999 cycle'', v_name);
  v_seq := nextval(v_name)::varchar;
  result := format(''%s%s'', chr(64 + left(v_seq, char_length(v_seq) - 3)::smallint), right(v_seq, 3));
  return result;
end;
'LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.gen_recnum (p_dept uuid)
  OWNER TO appt_user;