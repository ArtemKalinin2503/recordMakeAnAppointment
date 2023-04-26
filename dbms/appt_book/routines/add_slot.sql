--создание слота
CREATE OR REPLACE FUNCTION appt_book.add_slot (
    p_day uuid,
    p_name text,
    p_st time,
    p_en time,
    p_topic uuid
)
RETURNS appt_book.oper_result AS
$body$
declare
  v_err oper_error_rec;
  v_res oper_result_rec;
begin
  if (select t.cl_time_intersect_ctrl from t_day t where t.ck_id = p_day) and
    exists (select from t_time_slot t where t.ck_day = p_day and t.ct_st < p_en and t.ct_en > p_st and null_equal(t.ck_topic, p_topic)) then
    v_err.err_code := -1;
    v_err.err_name := 'Пересекающиеся интервалы времени!';
    return row(v_err, v_res);
  end if;
  insert into t_time_slot (
    ck_day,
    cv_name,
    ct_st,
    ct_en,
    ck_topic
  ) values (
    p_day,
    p_name,
    p_st,
    p_en,
    p_topic
  ) returning ck_id into v_res.uuid;
  return row(v_err, v_res);
exception
  when others then
    v_err.err_code := -10000;
    v_err.err_name := 'Неизвестная ошибка';
    v_res.uuid := uuid_nil();
    return row(v_err, v_res);
end;
$body$ language plpgsql
VOLATILE
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
SET search_path = appt_book, public;

ALTER FUNCTION appt_book.add_slot (
    p_day uuid,
    p_name text,
    p_st time,
    p_en time,
    p_topic uuid
) OWNER TO appt_user;