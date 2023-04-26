set search_path = appt_book, public;

/*with iv_data as (
select null::int x, null::int y union all
select null x, 1 y union all
select 1 x, null y union all
select 1 x, 1 y union all
select 1 x, 2 y
)
select x, y, null_equal(x, y) eq from iv_data*/


--select * from get_user(p_id => '586bf298-96ba-492d-bd9a-f37e14efa757'); -- пользователь по id
select * from get_user(p_login => 'a.gorbunov@abr.tech'); -- пользователь по логину
select * from get_orgs(p_user => '586bf298-96ba-492d-bd9a-f37e14efa757'); -- организации пользователя
select * from get_depts(p_org => 'bda47105-06bf-4f74-9338-8177d166130a', p_topic => null/*'f827dd40-f54a-4315-bd9f-ca06b4541a19'*/); -- подразделения организации + по теме (опционально)
select * from get_topics(p_org => 'bda47105-06bf-4f74-9338-8177d166130a', p_dept => null/*'2ace3877-1621-4456-8694-5d139eef70b4'*/); -- темы организации + подразделения (опционально)
--select * from get_days(p_dept => '2ace3877-1621-4456-8694-5d139eef70b4');
--select * from get_slots(p_day => 'b2f7d21d-c71b-4e93-baf2-98ebcd63e29b', p_topic => 'f827dd40-f54a-4315-bd9f-ca06b4541a19');
select * from get_avail_days(p_dept => '7943937d-fe42-4fe3-a771-b893c3754ed4', p_topic => 'f827dd40-f54a-4315-bd9f-ca06b4541a19'); -- доступные для записи на прием дни (по подразделению)
select * from get_avail_slots(p_day => '116cd3cb-46b9-4bde-84e8-b46467386b6e', p_topic => 'f827dd40-f54a-4315-bd9f-ca06b4541a19'); -- доступные временные окна для записи на прием (по uid дня)
select lock_slot(p_client_auth_id => build_user_clid('586bf298-96ba-492d-bd9a-f37e14efa757'), p_slot => '147d51d6-0688-4ce5-b19b-fe681b80d4af'::uuid); --заблокировать указанное временное окно
select make_appointment(
  p_client_auth_id => build_user_clid('586bf298-96ba-492d-bd9a-f37e14efa757'),
  p_slot => 'f1049f31-83e5-48e1-9fe9-785dd3a9839e',
  p_surname => 'Романов',
  p_name => 'Николай',
  p_patronymic => 'Александрович',
  p_phone => '8(888)888-88-88',
  p_email => 'tsar@zimniy.re',
  p_ca_num => '0088663322',
  p_notif => true,
  p_topic => 'f827dd40-f54a-4315-bd9f-ca06b4541a19',
  p_ext_client => null,
  p_ext_contact => null,
  p_recnum => gen_recnum(p_dept => '2ace3877-1621-4456-8694-5d139eef70b4'),
  p_comment => 'Тестовая запись'); -- зарегистрировать запись на прием, в ответе - идентификатор записи на прием
--запрос для грида записи на прием с пагинацией и встроенными фильтрами
select t.*,
       ceil(t.cnt_total::numeric / 10/*p_page_limit*/) pages_count/*Необходимое общее количество страниц для отображения данных*/
  from appt_book.get_appointments_list(/*p_org => 'bda4710d-06bf-4f74-9338-8177d166130a', p_dept => '7943937d-fe42-4fe3-a771-b893c3754ed4', p_date_from => null, p_date_to =>  null,*/
  p_page => 1, p_page_limit => 10, p_id => null, p_org => null, p_dept => null, p_date_from => '2023-2-3', p_date_to =>  null, p_order => order_by(array['cv_recnum', 'cv_client_name']::varchar[], array['desc']::varchar[], null)) t;

--select get_client_id(jsonb_build_object('id','123123123')); --b0f56053-5f5d-4f90-a495-4ac1f804c8b2
--select free_locks('b0f56053-5f5d-4f90-a495-4ac1f804c8b2');
--select set_lock('b0f56053-5f5d-4f90-a495-4ac1f804c8b2'::uuid, '147d51d6-0688-4ce5-b19b-fe681b80d4af'::uuid)

--список тем
select t.*,
	   ceil(t.cnt_total::numeric / 10/*p_page_limit*/) pages_count
  from get_topics_list(p_org => 'bda47105-06bf-4f74-9338-8177d166130a', p_page => 1, p_page_limit => 10, p_order => order_by(array['cv_name']::VARCHAR[], null, null)) t;
--данные указанной темы
select t.*
  from get_topic(p_id => '21dbbede-6b14-4eb0-8cce-613cbd0c84c9') t;
--добавление темы
select add_topic(
    p_org => 'bda47105-06bf-4f74-9338-8177d166130a',
    p_name => 'Новая тема 3',
    p_desc => 'Описание новой темы 3',
    p_selfserv => false,
    p_avail => true,
    p_spec => false,
    p_depts => array ['7943937d-fe42-4fe3-a771-b893c3754ed4', '2ace3877-1621-4456-8694-5d139eef70b4']::uuid[]--/null/array[]::uuid[]
);
--логическое/физическое удаление темы
select delete_topic(p_id => 'da545e6a-ad6f-4430-835c-6924749ca2c0', p_remove => false);
--редактирование темы
select change_topic(
    p_id => '74c66c67-982b-467c-abb8-89c614ec0225',
    p_org => 'bda47105-06bf-4f74-9338-8177d166130a',
    p_name => 'Уже не новая тема 3',
    p_desc => 'Описание темы х',
    p_selfserv => true,
    p_avail => false,
    p_spec => true,
    p_depts => array ['2ace3877-1621-4456-8694-5d139eef70b4']::uuid[]--/null/array[]::uuid[]
);

--список дней подразделения
select t.*,
	   ceil(t.cnt_total::numeric / 10/*p_page_limit*/) pages_count
  from get_days_list(
    p_dept => '7943937d-fe42-4fe3-a771-b893c3754ed4',
    p_dt_st => '2023-1-1',
    p_dt_en => null,
    p_page => 1, p_page_limit => 10, p_order => order_by(array['ck_date']::varchar[], array['desc']::varchar[], null)) t;
--добавление дня
select add_day(p_dept => '7943937d-fe42-4fe3-a771-b893c3754ed4', p_date => '2023-2-4', p_time_intersect_ctrl => true, p_avail => true);
--удаление дня
select delete_day(p_id => 'f1be1f80-25c9-4da3-89e8-b7a7cd66faa9');
--копирование дня
select copy_day(p_id_from => 'b2f7d21d-c71b-4e93-baf2-98ebcd63e29b', p_date => '2023-2-5');
--редактирование дня
select change_day(p_id => '562c096f-c0b3-4ba6-ad22-49b7999c8903', p_dept => '7943937d-fe42-4fe3-a771-b893c3754ed4', p_date => '2023-2-4', p_time_intersect_ctrl => false, p_avail => false);
--день по подразделению и дате
--select get_day(p_dept => '7943937d-fe42-4fe3-a771-b893c3754ed4', p_date => '2023-2-4');

--список слотов
select t.*,
	   ceil(t.cnt_total::numeric / 10/*p_page_limit*/) pages_count
  from get_slots_list(
    p_day => get_day(p_dept => '7943937d-fe42-4fe3-a771-b893c3754ed4', p_date => '2023-2-3'),
    p_page => 1, p_page_limit => 10, p_order => order_by(array['ck_appointment_id','cv_name']::VARCHAR[], array[null, 'desc']::VARCHAR[], array['last']::VARCHAR[])) t;
--добавление слота
select (t).result.uuid,
       (t).err.err_code,
       (t).err.err_name
  from add_slot(p_day => 'f1be1f80-25c9-4da3-89e8-b7a7cd66faa9', p_name => 'Имя слота', p_st => '21:30', p_en => '22:30', p_topic => null) t;
--удаление слота
select delete_slot(p_id => 'e6a7bb1c-bcf9-40d4-8ec8-fcd07d5145e1');
--копирование слота
select copy_slot(p_id_from => 'f94ec584-03ee-4924-a6dd-e46034a1d9d3', p_st => '21:00',  p_en => '22:00');
--редактирование слота
select change_slot(
    p_id => 'f94ec584-03ee-4924-a6dd-e46034a1d9d3',
    p_day => 'f1be1f80-25c9-4da3-89e8-b7a7cd66faa9',
    p_name => 'Новое имя слота',
    p_st => '15:00',
    p_en => '15:30',
    p_topic => null);
    
select min(d.ck_date + s.num) next_date
  from t_day d
  cross join (select generate_series(1, 10000) as num) s
 where d.ck_id = '035a8b02-b331-4797-a7a6-03e258aa46ef'--параметр p_id_from - исходный день, из которого производится копирование
   and not exists (
     select 
       from t_day dd
      where dd.ck_dept = d.ck_dept
        and dd.ck_date = d.ck_date + s.num)