--редактирование темы организации
CREATE OR REPLACE FUNCTION appt_book.change_topic (
    p_id uuid,
    p_org uuid,
    p_name text,
    p_desc text,
    p_selfserv boolean,
    p_avail boolean,
    p_spec boolean,
    p_depts uuid []
)
RETURNS boolean AS
$body$
declare
begin
  update t_topic
     set ck_org = p_org,
         cv_name = p_name,
         cv_desc = p_desc,
         cl_serfserv = p_selfserv,
         cl_avail = p_avail,
         cl_spec = p_spec
   where ck_id = p_id;
  delete
    from t_dept_topic t
   where t.ck_topic = p_id
     and t.ck_dept != all(p_depts);
  insert into t_dept_topic (ck_dept, ck_topic)
  select d, p_id
    from unnest(p_depts) d
  on conflict do nothing;
  return true;
exception
  when others then
    return false;
end;
$body$ language plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.change_topic (
    p_id uuid,
    p_org uuid,
    p_name text,
    p_desc text,
    p_selfserv boolean,
    p_avail boolean,
    p_spec boolean,
    p_depts uuid []
) OWNER TO appt_user;