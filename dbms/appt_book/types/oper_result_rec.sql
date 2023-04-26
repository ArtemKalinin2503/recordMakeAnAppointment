CREATE TYPE appt_book.oper_result_rec AS (
  uuid UUID,
  "varchar" VARCHAR,
  "bigint" BIGINT,
  "boolean" BOOLEAN,
  date DATE,
  "timestamp" TIMESTAMP(0) WITHOUT TIME ZONE
);

ALTER TYPE appt_book.oper_result_rec
  OWNER TO appt_user;