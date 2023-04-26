--список организаций, доступных главному админу
CREATE OR REPLACE FUNCTION appt_book.get_orgs_main_admin()
 RETURNS appt_book.t_org'
SELECT o.*
from t_org o
         join t_org_user ou
              on ou.ck_org = o.ck_id
where o.cl_active
  and o.cl_app_avail
 'LANGUAGE 'sql'
    STABLE
    SECURITY DEFINER
    PARALLEL SAFE
    COST 100 ROWS 1000
    SET search_path TO appt_book, public;

ALTER FUNCTION appt_book.get_orgs_main_admin()
    OWNER TO appt_user;
