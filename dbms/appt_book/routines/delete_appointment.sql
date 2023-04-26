--удаление записи на прием
CREATE
OR REPLACE FUNCTION appt_book.delete_appointment (
p_active boolean,
appointment_id uuid
)
 RETURNS boolean AS '
BEGIN
UPDATE appt_book.t_appointment  SET cl_active  = p_active
WHERE appt_book.t_appointment.ck_id = appointment_id;
return true;
EXCEPTION
  	WHEN OTHERS THEN
  	return false;
END;
' LANGUAGE 'plpgsql'
 VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
 SET search_path = appt_book, public;

ALTER FUNCTION appt_book.delete_appointment (p_active boolean, appointment_id uuid)
    OWNER TO appt_user;