CREATE TYPE appt_book.oper_result AS (
  err appt_book.oper_error_rec,
  result appt_book.oper_result_rec
);

ALTER TYPE appt_book.oper_result
  OWNER TO appt_user;