--создание записи на прием
CREATE OR REPLACE FUNCTION appt_book.make_appointment (
  p_client_auth_id jsonb,
  p_slot uuid,
  p_surname varchar,
  p_name varchar,
  p_patronymic varchar,
  p_phone varchar,
  p_email varchar,
  p_ca_num varchar,
  p_notif boolean,
  p_topic uuid,
  p_ext_client varchar,
  p_ext_contact varchar,
  p_recnum varchar,
  p_comment varchar
)
RETURNS uuid AS'
declare
  result uuid;
  v_ex boolean;
begin
  select exists (select from t_appointment a where a.ck_time_slot = p_slot and a.cl_active) into v_ex;
  if not v_ex and lock_slot(p_client_auth_id, p_slot) then
    insert into t_appointment (
      ck_time_slot,
      cv_client_surname,
      cv_client_name,
      cv_client_patronymic,
      cv_mobilephone,
      cv_email,
      cv_ca_number,
      cl_email_notif,
      ck_topic,
      cv_ext_client,
      cv_ext_contact,
      cv_recnum,
      cv_comment,
      ck_client)
    values (
      p_slot,
      p_surname,
      p_name,
      p_patronymic,
      p_phone,
      p_email,
      p_ca_num,
      p_notif,
      p_topic,
      p_ext_client,
      p_ext_contact,
      p_recnum,
      p_comment,
      get_client_id(p_client_auth_id)
    ) returning ck_id into result;
    perform unlock_slot(p_client_auth_id, p_slot);
  else
    result := uuid_nil();
  end if;
  return result;
end;
'LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.make_appointment (p_client_auth_id jsonb, p_slot uuid, p_surname varchar, p_name varchar, p_patronymic varchar, p_phone varchar, p_email varchar, p_ca_num varchar, p_notif boolean, p_topic uuid, p_ext_client varchar, p_ext_contact varchar, p_recnum varchar, p_comment varchar) OWNER TO appt_user;