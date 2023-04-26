--создание темы организации
CREATE OR REPLACE FUNCTION appt_book.add_topic (
    p_org uuid,
    p_name text,
    p_desc text,
    p_selfserv boolean,
    p_avail boolean,
    p_spec boolean,
    p_depts uuid []
)
RETURNS uuid AS
$body$
declare
  result uuid;
begin
  insert into t_topic (
    ck_org,
    cv_name,
    cv_desc,
    cl_serfserv,
    cl_avail,
    cl_spec
  ) values (
    p_org,
    p_name,
    p_desc,
    p_selfserv,
    p_avail,
    p_spec
  ) returning ck_id into result;
  insert into t_dept_topic (ck_dept, ck_topic)
  select d, result
    from unnest(p_depts) d;
  return result;
end;
$body$ language plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.add_topic (
    p_org uuid,
    p_name text,
    p_desc text,
    p_selfserv boolean,
    p_avail boolean,
    p_spec boolean,
    p_depts uuid []
) OWNER TO appt_user;