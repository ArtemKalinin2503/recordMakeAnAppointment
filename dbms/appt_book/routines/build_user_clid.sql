-- создание идентификатора клиента для пользователя системы (для записей без авторизационного идентификатора от внешних систем)
CREATE OR REPLACE FUNCTION appt_book.build_user_clid (
  p_user uuid
)
RETURNS jsonb AS'
SELECT jsonb_build_object(''appt_book_user_id'', t.ck_id)
  from t_user t
 where t.ck_id = p_user;
'LANGUAGE 'sql'
IMMUTABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.build_user_clid (p_user uuid)
  OWNER TO appt_user;