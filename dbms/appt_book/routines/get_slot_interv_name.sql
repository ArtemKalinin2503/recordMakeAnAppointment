-- имя временного окна для отображения при регистрации ЗнП
CREATE OR REPLACE FUNCTION appt_book.get_slot_interv_name (
  p_rw appt_book.t_time_slot
)
RETURNS varchar AS
$body$
SELECT format(E'%s - %s', to_char(p_rw.ct_st, 'hh24:mi'), to_char(p_rw.ct_en, 'hh24:mi'))
$body$
LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY INVOKER
PARALLEL SAFE
COST 100;

ALTER FUNCTION appt_book.get_slot_interv_name (p_rw appt_book.t_time_slot)
  OWNER TO appt_user;