--список организаций, доступных пользователю
CREATE OR REPLACE FUNCTION appt_book.get_orgs (
  p_user uuid
)
RETURNS SETOF appt_book.t_org AS'
SELECT o.*
  from t_org o
  join t_org_user ou
    on ou.ck_org = o.ck_id
  join get_user(p_user) u
    on u.ck_id = ou.ck_user
 where o.cl_active
   and o.cl_app_avail
'LANGUAGE 'sql'
STABLE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL SAFE
COST 100 ROWS 1000
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.get_orgs (p_user uuid)
  OWNER TO appt_user;