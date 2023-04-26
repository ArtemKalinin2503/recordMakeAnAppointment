-- DROP SCHEMA appt_book;

CREATE SCHEMA appt_book AUTHORIZATION appt_user;

-- DROP SEQUENCE appt_book.t_d_grade_src_ck_id_seq;

CREATE SEQUENCE appt_book.t_d_grade_src_ck_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE appt_book.t_d_grade_src_ck_id_seq OWNER TO appt_user;
GRANT ALL ON SEQUENCE appt_book.t_d_grade_src_ck_id_seq TO appt_user;

-- DROP SEQUENCE appt_book.t_d_qa_status_ck_id_seq;

CREATE SEQUENCE appt_book.t_d_qa_status_ck_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE appt_book.t_d_qa_status_ck_id_seq OWNER TO appt_user;
GRANT ALL ON SEQUENCE appt_book.t_d_qa_status_ck_id_seq TO appt_user;

-- DROP SEQUENCE appt_book.t_ext_id_map_ck_id_seq;

CREATE SEQUENCE appt_book.t_ext_id_map_ck_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE appt_book.t_ext_id_map_ck_id_seq OWNER TO appt_user;
GRANT ALL ON SEQUENCE appt_book.t_ext_id_map_ck_id_seq TO appt_user;
-- appt_book.t_client definition

-- Drop table

-- DROP TABLE appt_book.t_client;

CREATE TABLE appt_book.t_client (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- Уникальный код (uuid)
	cv_external jsonb NOT NULL, -- Авторизационный идентификатор
	ct_create timestamp(6) NOT NULL, -- Дата/время создания
	cv_phone varchar(255) NULL, -- Номер телефона
	cv_email varchar(255) NULL, -- Электронная почта
	ct_change timestamp(6) NOT NULL, -- Дата/время последнего изменения
	CONSTRAINT cin_p_client PRIMARY KEY (ck_id)
);
CREATE UNIQUE INDEX t_client_cv_external ON appt_book.t_client USING btree (cv_external);
COMMENT ON TABLE appt_book.t_client IS 'Клиенты/пользователи (граждане)';

-- Column comments

COMMENT ON COLUMN appt_book.t_client.ck_id IS 'Уникальный код (uuid)';
COMMENT ON COLUMN appt_book.t_client.cv_external IS 'Авторизационный идентификатор';
COMMENT ON COLUMN appt_book.t_client.ct_create IS 'Дата/время создания';
COMMENT ON COLUMN appt_book.t_client.cv_phone IS 'Номер телефона';
COMMENT ON COLUMN appt_book.t_client.cv_email IS 'Электронная почта';
COMMENT ON COLUMN appt_book.t_client.ct_change IS 'Дата/время последнего изменения';

-- Permissions

ALTER TABLE appt_book.t_client OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_client TO appt_user;


-- appt_book.t_d_grade_src definition

-- Drop table

-- DROP TABLE appt_book.t_d_grade_src;

CREATE TABLE appt_book.t_d_grade_src (
	ck_id serial4 NOT NULL, -- Код
	cv_name text NOT NULL, -- Наименование
	CONSTRAINT t_d_grade_src_pkey PRIMARY KEY (ck_id)
);
COMMENT ON TABLE appt_book.t_d_grade_src IS 'Система-источник получения оценки';

-- Column comments

COMMENT ON COLUMN appt_book.t_d_grade_src.ck_id IS 'Код';
COMMENT ON COLUMN appt_book.t_d_grade_src.cv_name IS 'Наименование';

-- Permissions

ALTER TABLE appt_book.t_d_grade_src OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_d_grade_src TO appt_user;


-- appt_book.t_d_qa_status definition

-- Drop table

-- DROP TABLE appt_book.t_d_qa_status;

CREATE TABLE appt_book.t_d_qa_status (
	ck_id serial4 NOT NULL, -- Код
	cv_name text NOT NULL, -- Наименование
	CONSTRAINT t_d_qa_status_pkey PRIMARY KEY (ck_id)
);
COMMENT ON TABLE appt_book.t_d_qa_status IS 'Статус оценки качества';

-- Column comments

COMMENT ON COLUMN appt_book.t_d_qa_status.ck_id IS 'Код';
COMMENT ON COLUMN appt_book.t_d_qa_status.cv_name IS 'Наименование';

-- Permissions

ALTER TABLE appt_book.t_d_qa_status OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_d_qa_status TO appt_user;


-- appt_book.t_ext_id_map definition

-- Drop table

-- DROP TABLE appt_book.t_ext_id_map;

CREATE TABLE appt_book.t_ext_id_map (
	ck_id serial4 NOT NULL, -- Код идентификатора внешней системы
	cv_ext_id varchar(36) NOT NULL, -- Внешняя система
	CONSTRAINT t_ext_id_map_pkey PRIMARY KEY (ck_id)
);
COMMENT ON TABLE appt_book.t_ext_id_map IS 'Справочник идентификаторов внешних систем';

-- Column comments

COMMENT ON COLUMN appt_book.t_ext_id_map.ck_id IS 'Код идентификатора внешней системы';
COMMENT ON COLUMN appt_book.t_ext_id_map.cv_ext_id IS 'Внешняя система';

-- Permissions

ALTER TABLE appt_book.t_ext_id_map OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_ext_id_map TO appt_user;


-- appt_book.t_qa_quest definition

-- Drop table

-- DROP TABLE appt_book.t_qa_quest;

CREATE TABLE appt_book.t_qa_quest (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	cv_name text NOT NULL, -- Наименование
	cv_quest text NOT NULL, -- Вопрос
	cv_desc text NULL, -- Описание
	cn_feedback_hours int2 NULL, -- Срок получения обратной связи
	cl_inputbox bool NOT NULL DEFAULT false, -- Отображать поле для ввода текста в Веб-интерфейсе
	cl_inputbox_label text NULL, -- Текст рядом с полем для ввода текста
	cl_active bool NOT NULL DEFAULT true, -- Действует
	ck_primal_key uuid NULL, -- Внутренний идентификатор (Стабильный ключ вопроса)
	CONSTRAINT t_qa_quest_pkey PRIMARY KEY (ck_id)
);
CREATE UNIQUE INDEX t_qa_quest_i1 ON appt_book.t_qa_quest USING btree (ck_primal_key) WHERE cl_active;
COMMENT ON TABLE appt_book.t_qa_quest IS 'Вопрос для оценки качества';

-- Column comments

COMMENT ON COLUMN appt_book.t_qa_quest.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_qa_quest.cv_name IS 'Наименование';
COMMENT ON COLUMN appt_book.t_qa_quest.cv_quest IS 'Вопрос';
COMMENT ON COLUMN appt_book.t_qa_quest.cv_desc IS 'Описание';
COMMENT ON COLUMN appt_book.t_qa_quest.cn_feedback_hours IS 'Срок получения обратной связи';
COMMENT ON COLUMN appt_book.t_qa_quest.cl_inputbox IS 'Отображать поле для ввода текста в Веб-интерфейсе';
COMMENT ON COLUMN appt_book.t_qa_quest.cl_inputbox_label IS 'Текст рядом с полем для ввода текста';
COMMENT ON COLUMN appt_book.t_qa_quest.cl_active IS 'Действует';
COMMENT ON COLUMN appt_book.t_qa_quest.ck_primal_key IS 'Внутренний идентификатор (Стабильный ключ вопроса)';

-- Permissions

ALTER TABLE appt_book.t_qa_quest OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_qa_quest TO appt_user;


-- appt_book.t_user definition

-- Drop table

-- DROP TABLE appt_book.t_user;

CREATE TABLE appt_book.t_user (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	cv_login varchar(100) NOT NULL, -- Логин
	cv_hash text NULL, -- *Пароль
	cv_name text NOT NULL, -- ФИО
	cv_phone text NOT NULL, -- Телефон
	cv_mail text NOT NULL, -- Эл. почта
	cl_adm bool NOT NULL DEFAULT false, -- Главный администратор
	cl_org_adm bool NOT NULL DEFAULT false, -- Администратор организации
	cl_oper bool NOT NULL DEFAULT false, -- Оператор
	cl_ext_org bool NOT NULL DEFAULT false, -- Внешняя система
	cn_timezone int2 NULL, -- Часовой пояс
	cv_ext_id varchar(36) NULL, -- Пользователь внешняя ссылка
	cl_active bool NOT NULL DEFAULT true, -- Действует
	cl_contact_oper bool NOT NULL DEFAULT false, -- Оператор приема клиентов
	CONSTRAINT t_user_pkey PRIMARY KEY (ck_id)
);
CREATE INDEX t_user_i1 ON appt_book.t_user USING btree (cl_active, cv_login);
COMMENT ON TABLE appt_book.t_user IS 'Пользователь';

-- Column comments

COMMENT ON COLUMN appt_book.t_user.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_user.cv_login IS 'Логин';
COMMENT ON COLUMN appt_book.t_user.cv_hash IS '*Пароль';
COMMENT ON COLUMN appt_book.t_user.cv_name IS 'ФИО';
COMMENT ON COLUMN appt_book.t_user.cv_phone IS 'Телефон';
COMMENT ON COLUMN appt_book.t_user.cv_mail IS 'Эл. почта';
COMMENT ON COLUMN appt_book.t_user.cl_adm IS 'Главный администратор';
COMMENT ON COLUMN appt_book.t_user.cl_org_adm IS 'Администратор организации';
COMMENT ON COLUMN appt_book.t_user.cl_oper IS 'Оператор';
COMMENT ON COLUMN appt_book.t_user.cl_ext_org IS 'Внешняя система';
COMMENT ON COLUMN appt_book.t_user.cn_timezone IS 'Часовой пояс';
COMMENT ON COLUMN appt_book.t_user.cv_ext_id IS 'Пользователь внешняя ссылка';
COMMENT ON COLUMN appt_book.t_user.cl_active IS 'Действует';
COMMENT ON COLUMN appt_book.t_user.cl_contact_oper IS 'Оператор приема клиентов';

-- Permissions

ALTER TABLE appt_book.t_user OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_user TO appt_user;


-- appt_book.t_org definition

-- Drop table

-- DROP TABLE appt_book.t_org;

CREATE TABLE appt_book.t_org (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	cv_name text NOT NULL, -- Название
	cv_ofname text NOT NULL, -- Наименование организации
	cv_desc text NULL, -- Описание
	cv_ofname_full text NOT NULL, -- Полное официальное наименование
	cv_phone text NOT NULL, -- Телефон
	cl_app_avail bool NOT NULL DEFAULT true, -- Разрешена запись на приём
	cv_selfserv_link text NULL, -- Веб-интерефейс самообслуживания
	cv_ext_id varchar(36) NULL, -- Организация - внешняя система
	cv_show_ca_num bool NOT NULL DEFAULT true, -- Отображать поле ЛС в веб-интерфейсе самообслуживания
	cl_active bool NOT NULL DEFAULT true, -- Действует
	cl_selfserv bool NOT NULL DEFAULT true, -- Активна в Веб-интерфейсе самообслуживания
	cl_use_client_id bool NOT NULL DEFAULT true, -- Требуется авторизационный идентификатор
	ck_def_qa_quest uuid NULL, -- Вопрос для оценки качества по умолчанию
	CONSTRAINT t_org_pkey PRIMARY KEY (ck_id),
	CONSTRAINT fkt_org827743 FOREIGN KEY (ck_def_qa_quest) REFERENCES appt_book.t_qa_quest(ck_id)
);
COMMENT ON TABLE appt_book.t_org IS 'Организация';

-- Column comments

COMMENT ON COLUMN appt_book.t_org.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_org.cv_name IS 'Название';
COMMENT ON COLUMN appt_book.t_org.cv_ofname IS 'Наименование организации';
COMMENT ON COLUMN appt_book.t_org.cv_desc IS 'Описание';
COMMENT ON COLUMN appt_book.t_org.cv_ofname_full IS 'Полное официальное наименование';
COMMENT ON COLUMN appt_book.t_org.cv_phone IS 'Телефон';
COMMENT ON COLUMN appt_book.t_org.cl_app_avail IS 'Разрешена запись на приём';
COMMENT ON COLUMN appt_book.t_org.cv_selfserv_link IS 'Веб-интерефейс самообслуживания';
COMMENT ON COLUMN appt_book.t_org.cv_ext_id IS 'Организация - внешняя система';
COMMENT ON COLUMN appt_book.t_org.cv_show_ca_num IS 'Отображать поле ЛС в веб-интерфейсе самообслуживания';
COMMENT ON COLUMN appt_book.t_org.cl_active IS 'Действует';
COMMENT ON COLUMN appt_book.t_org.cl_selfserv IS 'Активна в Веб-интерфейсе самообслуживания';
COMMENT ON COLUMN appt_book.t_org.cl_use_client_id IS 'Требуется авторизационный идентификатор';
COMMENT ON COLUMN appt_book.t_org.ck_def_qa_quest IS 'Вопрос для оценки качества по умолчанию';

-- Permissions

ALTER TABLE appt_book.t_org OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_org TO appt_user;


-- appt_book.t_org_user definition

-- Drop table

-- DROP TABLE appt_book.t_org_user;

CREATE TABLE appt_book.t_org_user (
	ck_org uuid NOT NULL, -- УИД организации
	ck_user uuid NOT NULL, -- УИД пользователя
	CONSTRAINT t_org_user_pkey PRIMARY KEY (ck_org, ck_user),
	CONSTRAINT fkt_org_user597956 FOREIGN KEY (ck_org) REFERENCES appt_book.t_org(ck_id),
	CONSTRAINT fkt_org_user810674 FOREIGN KEY (ck_user) REFERENCES appt_book.t_user(ck_id)
);
COMMENT ON TABLE appt_book.t_org_user IS 'Пользователь организации';

-- Column comments

COMMENT ON COLUMN appt_book.t_org_user.ck_org IS 'УИД организации';
COMMENT ON COLUMN appt_book.t_org_user.ck_user IS 'УИД пользователя';

-- Permissions

ALTER TABLE appt_book.t_org_user OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_org_user TO appt_user;


-- appt_book.t_topic definition

-- Drop table

-- DROP TABLE appt_book.t_topic;

CREATE TABLE appt_book.t_topic (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	ck_org uuid NOT NULL, -- Организация
	cv_name text NOT NULL, -- Наименование
	cv_desc text NULL, -- Описание
	cl_serfserv bool NOT NULL DEFAULT true, -- Активна в Веб-интерфейсе самообслуживания
	cl_avail bool NOT NULL DEFAULT true, -- Активна через API
	cl_spec bool NOT NULL DEFAULT false, -- Отдельные интервалы
	cl_active bool NOT NULL DEFAULT true, -- Действует
	CONSTRAINT t_topic_pkey PRIMARY KEY (ck_id),
	CONSTRAINT fkt_topic384615 FOREIGN KEY (ck_org) REFERENCES appt_book.t_org(ck_id)
);
CREATE UNIQUE INDEX t_topic_i1 ON appt_book.t_topic USING btree (cl_spec, ck_id);
CREATE INDEX t_topic_i2 ON appt_book.t_topic USING btree (ck_org);
COMMENT ON TABLE appt_book.t_topic IS 'Тема';

-- Column comments

COMMENT ON COLUMN appt_book.t_topic.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_topic.ck_org IS 'Организация';
COMMENT ON COLUMN appt_book.t_topic.cv_name IS 'Наименование';
COMMENT ON COLUMN appt_book.t_topic.cv_desc IS 'Описание';
COMMENT ON COLUMN appt_book.t_topic.cl_serfserv IS 'Активна в Веб-интерфейсе самообслуживания';
COMMENT ON COLUMN appt_book.t_topic.cl_avail IS 'Активна через API';
COMMENT ON COLUMN appt_book.t_topic.cl_spec IS 'Отдельные интервалы';
COMMENT ON COLUMN appt_book.t_topic.cl_active IS 'Действует';

-- Permissions

ALTER TABLE appt_book.t_topic OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_topic TO appt_user;


-- appt_book.t_dept definition

-- Drop table

-- DROP TABLE appt_book.t_dept;

CREATE TABLE appt_book.t_dept (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	ck_parent uuid NULL, -- Родительское подразделение
	ck_org uuid NOT NULL, -- Организация
	cv_name text NOT NULL, -- Название
	cv_ofname text NOT NULL, -- Наименование подразделения
	cv_desc text NULL, -- Описание
	cv_addr text NOT NULL, -- Адрес
	cv_mail text NULL, -- Эл. почта
	cv_phone text NULL, -- Телефон
	cv_app_avail bool NOT NULL DEFAULT true, -- Разрешена запись на приём
	cl_registry bool NOT NULL, -- Отправлять реестр
	cl_single_app bool NOT NULL DEFAULT false, -- Одна запись
	cn_timezone int2 NOT NULL, -- Часовой пояс, число
	cv_timezone text NOT NULL, -- Часовой пояс
	cn_days_ahead int4 NOT NULL, -- Глубина планирования
	cv_ext_id varchar(36) NULL, -- Подразделение - внешняя система
	cl_active bool NOT NULL DEFAULT true, -- Действует
	cn_longtitude float4 NULL, -- Долгота
	cn_latitude float4 NULL, -- Широта
	CONSTRAINT t_dept_pkey PRIMARY KEY (ck_id),
	CONSTRAINT fkt_dept317965 FOREIGN KEY (ck_org) REFERENCES appt_book.t_org(ck_id),
	CONSTRAINT fkt_dept806810 FOREIGN KEY (ck_parent) REFERENCES appt_book.t_dept(ck_id)
);
CREATE INDEX t_dept_ck_org ON appt_book.t_dept USING btree (ck_org);
CREATE INDEX t_dept_ck_parent ON appt_book.t_dept USING btree (ck_parent);
COMMENT ON TABLE appt_book.t_dept IS 'Подразделение';

-- Column comments

COMMENT ON COLUMN appt_book.t_dept.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_dept.ck_parent IS 'Родительское подразделение';
COMMENT ON COLUMN appt_book.t_dept.ck_org IS 'Организация';
COMMENT ON COLUMN appt_book.t_dept.cv_name IS 'Название';
COMMENT ON COLUMN appt_book.t_dept.cv_ofname IS 'Наименование подразделения';
COMMENT ON COLUMN appt_book.t_dept.cv_desc IS 'Описание';
COMMENT ON COLUMN appt_book.t_dept.cv_addr IS 'Адрес';
COMMENT ON COLUMN appt_book.t_dept.cv_mail IS 'Эл. почта';
COMMENT ON COLUMN appt_book.t_dept.cv_phone IS 'Телефон';
COMMENT ON COLUMN appt_book.t_dept.cv_app_avail IS 'Разрешена запись на приём';
COMMENT ON COLUMN appt_book.t_dept.cl_registry IS 'Отправлять реестр';
COMMENT ON COLUMN appt_book.t_dept.cl_single_app IS 'Одна запись';
COMMENT ON COLUMN appt_book.t_dept.cn_timezone IS 'Часовой пояс, число';
COMMENT ON COLUMN appt_book.t_dept.cv_timezone IS 'Часовой пояс';
COMMENT ON COLUMN appt_book.t_dept.cn_days_ahead IS 'Глубина планирования';
COMMENT ON COLUMN appt_book.t_dept.cv_ext_id IS 'Подразделение - внешняя система';
COMMENT ON COLUMN appt_book.t_dept.cl_active IS 'Действует';
COMMENT ON COLUMN appt_book.t_dept.cn_longtitude IS 'Долгота';
COMMENT ON COLUMN appt_book.t_dept.cn_latitude IS 'Широта';

-- Permissions

ALTER TABLE appt_book.t_dept OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_dept TO appt_user;


-- appt_book.t_dept_topic definition

-- Drop table

-- DROP TABLE appt_book.t_dept_topic;

CREATE TABLE appt_book.t_dept_topic (
	ck_dept uuid NOT NULL, -- УИД подразделения
	ck_topic uuid NOT NULL, -- УИД темы
	CONSTRAINT t_dept_topic_pkey PRIMARY KEY (ck_dept, ck_topic),
	CONSTRAINT fkt_dept_top737194 FOREIGN KEY (ck_dept) REFERENCES appt_book.t_dept(ck_id),
	CONSTRAINT fkt_dept_top772659 FOREIGN KEY (ck_topic) REFERENCES appt_book.t_topic(ck_id)
);
COMMENT ON TABLE appt_book.t_dept_topic IS 'Тема подразделения';

-- Column comments

COMMENT ON COLUMN appt_book.t_dept_topic.ck_dept IS 'УИД подразделения';
COMMENT ON COLUMN appt_book.t_dept_topic.ck_topic IS 'УИД темы';

-- Permissions

ALTER TABLE appt_book.t_dept_topic OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_dept_topic TO appt_user;


-- appt_book.t_day definition

-- Drop table

-- DROP TABLE appt_book.t_day;

CREATE TABLE appt_book.t_day (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	ck_dept uuid NOT NULL, -- Подразделение
	ck_date date NOT NULL, -- Дата
	cl_time_intersect_ctrl bool NOT NULL DEFAULT true, -- Контроль наложения времени
	cl_avail bool NOT NULL DEFAULT true, -- Приёмный
	cl_active bool NOT NULL DEFAULT true,
	CONSTRAINT t_day_pkey PRIMARY KEY (ck_id),
	CONSTRAINT fkt_day281887 FOREIGN KEY (ck_dept) REFERENCES appt_book.t_dept(ck_id)
);
CREATE INDEX t_day_ck_dept ON appt_book.t_day USING btree (ck_dept);
COMMENT ON TABLE appt_book.t_day IS 'День';

-- Column comments

COMMENT ON COLUMN appt_book.t_day.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_day.ck_dept IS 'Подразделение';
COMMENT ON COLUMN appt_book.t_day.ck_date IS 'Дата';
COMMENT ON COLUMN appt_book.t_day.cl_time_intersect_ctrl IS 'Контроль наложения времени';
COMMENT ON COLUMN appt_book.t_day.cl_avail IS 'Приёмный';

-- Permissions

ALTER TABLE appt_book.t_day OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_day TO appt_user;


-- appt_book.t_time_slot definition

-- Drop table

-- DROP TABLE appt_book.t_time_slot;

CREATE TABLE appt_book.t_time_slot (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	ck_day uuid NOT NULL, -- День
	cv_name text NULL, -- Наименование интервала
	ct_st time NOT NULL, -- Начало
	ct_en time NOT NULL, -- Окончание
	ck_topic uuid NULL, -- Тема ¶¶(возможность расширения до массива для поддержки ограничения списка тем в записи на слот)
	cl_active bool NOT NULL DEFAULT true, -- Действует
	CONSTRAINT t_time_slot_pkey PRIMARY KEY (ck_id),
	CONSTRAINT fkt_time_slo404362 FOREIGN KEY (ck_day) REFERENCES appt_book.t_day(ck_id),
	CONSTRAINT fkt_time_slo474424 FOREIGN KEY (ck_topic) REFERENCES appt_book.t_topic(ck_id)
);
CREATE INDEX t_time_slot_i1 ON appt_book.t_time_slot USING btree (ck_day, cl_active);
COMMENT ON TABLE appt_book.t_time_slot IS 'Время';

-- Column comments

COMMENT ON COLUMN appt_book.t_time_slot.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_time_slot.ck_day IS 'День';
COMMENT ON COLUMN appt_book.t_time_slot.cv_name IS 'Наименование интервала';
COMMENT ON COLUMN appt_book.t_time_slot.ct_st IS 'Начало';
COMMENT ON COLUMN appt_book.t_time_slot.ct_en IS 'Окончание';
COMMENT ON COLUMN appt_book.t_time_slot.ck_topic IS 'Тема 

(возможность расширения до массива для поддержки ограничения списка тем в записи на слот)';
COMMENT ON COLUMN appt_book.t_time_slot.cl_active IS 'Действует';

-- Permissions

ALTER TABLE appt_book.t_time_slot OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_time_slot TO appt_user;


-- appt_book.t_appointment definition

-- Drop table

-- DROP TABLE appt_book.t_appointment;

CREATE TABLE appt_book.t_appointment (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	ck_time_slot uuid NOT NULL, -- Время
	cv_client_surname text NULL, -- Фамилия
	cv_client_name text NOT NULL, -- Имя
	cv_client_patronymic text NULL, -- Отчество
	cv_mobilephone text NOT NULL, -- Мобильный телефон
	cv_email text NOT NULL, -- Эл. почта
	cv_ca_number text NULL, -- Лицевой счёт
	cl_email_notif bool NOT NULL DEFAULT true, -- Уведомить по эл. почте
	ck_topic uuid NOT NULL, -- Тема
	cv_ext_client varchar(36) NULL, -- Клиент - внешняя система
	cv_ext_contact varchar(36) NULL, -- Обращение - внешняя система
	cl_active bool NOT NULL DEFAULT true, -- Действует
	cl_blocked bool NOT NULL DEFAULT false, -- Заблокировано
	cv_recnum varchar(4) NOT NULL, -- Номер записи
	cv_comment text NULL, -- Комментарий
	ck_client uuid NOT NULL, -- Идентификатор клиента
	CONSTRAINT t_appointment_pkey PRIMARY KEY (ck_id),
	CONSTRAINT fkt_appointm494453 FOREIGN KEY (ck_client) REFERENCES appt_book.t_client(ck_id),
	CONSTRAINT fkt_appointm682726 FOREIGN KEY (ck_topic) REFERENCES appt_book.t_topic(ck_id),
	CONSTRAINT fkt_appointm834220 FOREIGN KEY (ck_time_slot) REFERENCES appt_book.t_time_slot(ck_id)
);
CREATE INDEX t_appointment_i1 ON appt_book.t_appointment USING btree (ck_time_slot DESC, cl_active);
COMMENT ON TABLE appt_book.t_appointment IS 'Запись на приём';

-- Column comments

COMMENT ON COLUMN appt_book.t_appointment.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_appointment.ck_time_slot IS 'Время';
COMMENT ON COLUMN appt_book.t_appointment.cv_client_surname IS 'Фамилия';
COMMENT ON COLUMN appt_book.t_appointment.cv_client_name IS 'Имя';
COMMENT ON COLUMN appt_book.t_appointment.cv_client_patronymic IS 'Отчество';
COMMENT ON COLUMN appt_book.t_appointment.cv_mobilephone IS 'Мобильный телефон';
COMMENT ON COLUMN appt_book.t_appointment.cv_email IS 'Эл. почта';
COMMENT ON COLUMN appt_book.t_appointment.cv_ca_number IS 'Лицевой счёт';
COMMENT ON COLUMN appt_book.t_appointment.cl_email_notif IS 'Уведомить по эл. почте';
COMMENT ON COLUMN appt_book.t_appointment.ck_topic IS 'Тема';
COMMENT ON COLUMN appt_book.t_appointment.cv_ext_client IS 'Клиент - внешняя система';
COMMENT ON COLUMN appt_book.t_appointment.cv_ext_contact IS 'Обращение - внешняя система';
COMMENT ON COLUMN appt_book.t_appointment.cl_active IS 'Действует';
COMMENT ON COLUMN appt_book.t_appointment.cl_blocked IS 'Заблокировано';
COMMENT ON COLUMN appt_book.t_appointment.cv_recnum IS 'Номер записи';
COMMENT ON COLUMN appt_book.t_appointment.cv_comment IS 'Комментарий';
COMMENT ON COLUMN appt_book.t_appointment.ck_client IS 'Идентификатор клиента';

-- Permissions

ALTER TABLE appt_book.t_appointment OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_appointment TO appt_user;


-- appt_book.t_book_que definition

-- Drop table

-- DROP TABLE appt_book.t_book_que;

CREATE TABLE appt_book.t_book_que (
	ck_time_slot uuid NOT NULL, -- УИД блокируемого слота времени
	ck_client uuid NOT NULL, -- УИД клиента
	ct_create timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Дата/время создания
	ct_ttl timestamp(6) NOT NULL, -- Время окончания жизни "блокировки" (=ct_create+определенное кол-во секунд)
	CONSTRAINT t_book_que_pkey PRIMARY KEY (ck_time_slot),
	CONSTRAINT fkt_book_que660764 FOREIGN KEY (ck_client) REFERENCES appt_book.t_client(ck_id),
	CONSTRAINT fkt_book_que982151 FOREIGN KEY (ck_time_slot) REFERENCES appt_book.t_time_slot(ck_id)
);
CREATE INDEX t_book_que_i1 ON appt_book.t_book_que USING btree (ck_client);
COMMENT ON TABLE appt_book.t_book_que IS 'Очередь для "блокировки" времени на запись';

-- Column comments

COMMENT ON COLUMN appt_book.t_book_que.ck_time_slot IS 'УИД блокируемого слота времени';
COMMENT ON COLUMN appt_book.t_book_que.ck_client IS 'УИД клиента';
COMMENT ON COLUMN appt_book.t_book_que.ct_create IS 'Дата/время создания';
COMMENT ON COLUMN appt_book.t_book_que.ct_ttl IS 'Время окончания жизни "блокировки" (=ct_create+определенное кол-во секунд)';

-- Permissions

ALTER TABLE appt_book.t_book_que OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_book_que TO appt_user;


-- appt_book.t_qa definition

-- Drop table

-- DROP TABLE appt_book.t_qa;

CREATE TABLE appt_book.t_qa (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	ck_qa_quest uuid NOT NULL, -- Вопрос для оценки качества
	cv_ext_proc varchar(36) NULL, -- Процесс - внешняя система
	cv_contact varchar(36) NULL, -- Обращение - внешняя система
	cv_mobilephone text NULL, -- Мобильный телефон
	cv_email text NULL, -- Электронная почта
	cv_link_id text NULL, -- Идентификатор генерируемый для ссылки
	ck_d_qa_status int2 NULL, -- Статус
	ct_create timestamp NOT NULL, -- Дата создания ссылки на оценку качества
	ck_ext_id int4 NULL,
	ck_appointment uuid NULL,
	CONSTRAINT t_qa_pkey PRIMARY KEY (ck_id),
	CONSTRAINT fkt_qa442285 FOREIGN KEY (ck_qa_quest) REFERENCES appt_book.t_qa_quest(ck_id),
	CONSTRAINT fkt_qa693896 FOREIGN KEY (ck_ext_id) REFERENCES appt_book.t_ext_id_map(ck_id),
	CONSTRAINT fkt_qa777760 FOREIGN KEY (ck_d_qa_status) REFERENCES appt_book.t_d_qa_status(ck_id),
	CONSTRAINT fkt_qa94293 FOREIGN KEY (ck_appointment) REFERENCES appt_book.t_appointment(ck_id)
);
COMMENT ON TABLE appt_book.t_qa IS 'Ссылка для оценки качества';

-- Column comments

COMMENT ON COLUMN appt_book.t_qa.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_qa.ck_qa_quest IS 'Вопрос для оценки качества';
COMMENT ON COLUMN appt_book.t_qa.cv_ext_proc IS 'Процесс - внешняя система';
COMMENT ON COLUMN appt_book.t_qa.cv_contact IS 'Обращение - внешняя система';
COMMENT ON COLUMN appt_book.t_qa.cv_mobilephone IS 'Мобильный телефон';
COMMENT ON COLUMN appt_book.t_qa.cv_email IS 'Электронная почта';
COMMENT ON COLUMN appt_book.t_qa.cv_link_id IS 'Идентификатор генерируемый для ссылки';
COMMENT ON COLUMN appt_book.t_qa.ck_d_qa_status IS 'Статус';
COMMENT ON COLUMN appt_book.t_qa.ct_create IS 'Дата создания ссылки на оценку качества';

-- Permissions

ALTER TABLE appt_book.t_qa OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_qa TO appt_user;


-- appt_book.t_qa_grade definition

-- Drop table

-- DROP TABLE appt_book.t_qa_grade;

CREATE TABLE appt_book.t_qa_grade (
	ck_qa uuid NOT NULL, -- УИД оценки качества
	ct_grade timestamp NOT NULL, -- Дата оценки
	cn_grade int2 NULL, -- Оценка
	cv_grade text NULL, -- Оценка текстом
	ck_d_grade_src int2 NULL,
	CONSTRAINT t_qa_grade_pkey PRIMARY KEY (ck_qa, ct_grade),
	CONSTRAINT fkt_qa_grade133847 FOREIGN KEY (ck_d_grade_src) REFERENCES appt_book.t_d_grade_src(ck_id),
	CONSTRAINT fkt_qa_grade729697 FOREIGN KEY (ck_qa) REFERENCES appt_book.t_qa(ck_id)
);
COMMENT ON TABLE appt_book.t_qa_grade IS 'Оценка качества';

-- Column comments

COMMENT ON COLUMN appt_book.t_qa_grade.ck_qa IS 'УИД оценки качества';
COMMENT ON COLUMN appt_book.t_qa_grade.ct_grade IS 'Дата оценки';
COMMENT ON COLUMN appt_book.t_qa_grade.cn_grade IS 'Оценка';
COMMENT ON COLUMN appt_book.t_qa_grade.cv_grade IS 'Оценка текстом';

-- Permissions

ALTER TABLE appt_book.t_qa_grade OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_qa_grade TO appt_user;


-- appt_book.t_contact definition

-- Drop table

-- DROP TABLE appt_book.t_contact;

CREATE TABLE appt_book.t_contact (
	ck_id uuid NOT NULL DEFAULT gen_random_uuid(), -- УИД
	ct_create timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Дата приёма
	ck_appointment uuid NULL, -- Запись на прием - основание
	ck_contact_user uuid NOT NULL, -- Пользователь, производящий фактический прием
	ck_contact_qa uuid NULL, -- Оценка качества
	CONSTRAINT t_contact_pkey PRIMARY KEY (ck_id),
	CONSTRAINT fkt_contact231324 FOREIGN KEY (ck_contact_qa) REFERENCES appt_book.t_qa(ck_id),
	CONSTRAINT fkt_contact427676 FOREIGN KEY (ck_contact_user) REFERENCES appt_book.t_user(ck_id),
	CONSTRAINT fkt_contact6951 FOREIGN KEY (ck_appointment) REFERENCES appt_book.t_appointment(ck_id)
);
COMMENT ON TABLE appt_book.t_contact IS 'Прием клиента';

-- Column comments

COMMENT ON COLUMN appt_book.t_contact.ck_id IS 'УИД';
COMMENT ON COLUMN appt_book.t_contact.ct_create IS 'Дата приёма';
COMMENT ON COLUMN appt_book.t_contact.ck_appointment IS 'Запись на прием - основание';
COMMENT ON COLUMN appt_book.t_contact.ck_contact_user IS 'Пользователь, производящий фактический прием';
COMMENT ON COLUMN appt_book.t_contact.ck_contact_qa IS 'Оценка качества';

-- Permissions

ALTER TABLE appt_book.t_contact OWNER TO appt_user;
GRANT ALL ON TABLE appt_book.t_contact TO appt_user;

-- Permissions

GRANT ALL ON SCHEMA appt_book TO appt_user;