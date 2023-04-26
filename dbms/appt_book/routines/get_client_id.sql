--получение id клиента по авторизационному идентификатору
CREATE OR REPLACE FUNCTION appt_book.get_client_id (
  p_auth_id jsonb
)
RETURNS uuid AS'
DECLARE
  v_id uuid;
BEGIN
  select t.ck_id
    into strict v_id
    from t_client t
   where t.cv_external = p_auth_id;
  return v_id;
EXCEPTION
WHEN no_data_found THEN
  insert into t_client(ck_id, cv_external, ct_create, ct_change)
  values (gen_random_uuid(), p_auth_id, current_timestamp, current_timestamp)
  returning ck_id into v_id;
  return v_id;
END;
'LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_client_id (p_auth_id jsonb)
  OWNER TO appt_user;