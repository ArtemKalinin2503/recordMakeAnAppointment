CREATE TYPE appt_book.oper_error_rec AS (
  err_code BIGINT,
  err_name VARCHAR
);

COMMENT ON TYPE appt_book.oper_error_rec
IS 'Структура для возврата ошибок из функций изменения данных';

ALTER TYPE appt_book.oper_error_rec
  OWNER TO appt_user;