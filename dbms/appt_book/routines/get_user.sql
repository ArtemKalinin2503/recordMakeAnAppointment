--пользователь по логину
CREATE OR REPLACE FUNCTION appt_book.get_user (
  p_login varchar
)
RETURNS appt_book.t_user AS'
SELECT u.*
  from t_user u
 where u.cv_login = p_login
   and u.cl_active
'LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_user (p_login varchar)
  OWNER TO appt_user;

--пользователь по идентификатору
CREATE OR REPLACE FUNCTION appt_book.get_user (
  p_id uuid
)
RETURNS appt_book.t_user AS'
SELECT u.*
  from t_user u
 where u.ck_id = p_id
   and u.cl_active
'LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_user (p_id uuid)
  OWNER TO appt_user;