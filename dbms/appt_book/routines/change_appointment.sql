--редактирование записи на прием
CREATE OR REPLACE FUNCTION appt_book.change_appointment (
p_surname varchar,
p_name varchar,
p_patronymic varchar,
p_phone varchar,
p_email varchar,
p_notif boolean,
p_ca_number varchar,
p_comment varchar,
appointment_id uuid
)
 RETURNS boolean AS '
BEGIN
UPDATE appt_book.t_appointment
SET cv_client_surname = p_surname,
    cv_client_name = p_name,
    cv_client_patronymic = p_patronymic,
    cv_mobilephone = p_phone,
    cv_email       = p_email,
    cv_ca_number   = p_ca_number,
    cv_comment     = p_comment,
    cl_email_notif = p_notif
WHERE appt_book.t_appointment.ck_id = appointment_id;

return true;
EXCEPTION
  	WHEN OTHERS THEN

  	return false;
END;
'LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
 SECURITY DEFINER
PARALLEL UNSAFE
COST 100
 SET search_path  = appt_book, public;
ALTER FUNCTION appt_book.change_appointment (
p_surname varchar,
p_name varchar,
p_patronymic varchar,
p_phone varchar,
p_email varchar,
p_notif boolean,
p_ca_number varchar,
p_comment varchar,
appointment_id uuid) OWNER TO appt_user;

