--предварительная блокировка временного окна
CREATE OR REPLACE FUNCTION appt_book.lock_slot (
  p_client_auth_id jsonb,
  p_slot uuid
)
RETURNS boolean AS'
DECLARE
  v_client_id uuid;
  v_locked_slot uuid;
BEGIN
  v_client_id := get_client_id(p_client_auth_id);
  perform free_locks(v_client_id);
  select set_lock(v_client_id, p_slot) into v_locked_slot;
  return v_locked_slot = p_slot;
EXCEPTION
  WHEN others THEN
    return false;
END;
'LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.lock_slot (p_client_auth_id jsonb, p_slot uuid)
  OWNER TO appt_user;