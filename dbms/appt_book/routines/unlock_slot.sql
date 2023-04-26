--снятие блокировки временного окна
CREATE OR REPLACE FUNCTION appt_book.unlock_slot (
  p_client_auth_id jsonb,
  p_slot uuid
)
RETURNS void AS'
DECLARE
  v_client_id uuid;
BEGIN
  v_client_id := get_client_id(p_client_auth_id);
  perform free_locks(v_client_id, p_slot);
END;
'LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.unlock_slot (p_client_auth_id jsonb, p_slot uuid)
  OWNER TO appt_user;