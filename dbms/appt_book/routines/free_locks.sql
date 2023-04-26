-- снятие блокировок по клиенту (либо с конкретного временного окна)
CREATE OR REPLACE FUNCTION appt_book.free_locks (
  p_client uuid,
  p_slot uuid = NULL::uuid
)
RETURNS void AS'
delete
  from t_book_que bq
 where bq.ck_client = p_client
   and (p_slot is null or bq.ck_time_slot = p_slot)
'LANGUAGE 'sql'
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.free_locks (p_client uuid, p_slot uuid)
  OWNER TO appt_user;