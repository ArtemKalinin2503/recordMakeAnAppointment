create or replace function appt_book.get_weekday(p_day date) returns character varying language sql immutable parallel safe as
$function$
  select (array ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'])[extract(dow from p_day) + 1];
$function$;