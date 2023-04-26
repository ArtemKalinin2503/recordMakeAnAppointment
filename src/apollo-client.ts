import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MAIN_URL_API } from './main-config';
import { onError } from 'apollo-link-error';
import { GUEST_PATHES } from './routes/guest.config';

const httpLink = createHttpLink({
  uri: MAIN_URL_API
});

// Если любой запрос вернет 401 ошибку разлогинем путем удаления токена
const logoutLink = onError(({ networkError }) => {
  // @ts-ignore
  if (networkError.statusCode === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
  };
 })

 // Это будет подставлятся при каждом запросе бекенда
const authLink = setContext((_, { headers }) => {
  // Получаю url все после слеша
  const pathArray = window.location.href.replace(/.*\/\/[^\/]*/, '');  
  const isOutside = GUEST_PATHES.includes(String(pathArray));

  // Бекенд работает так, что на внешние url нельзя передавать заголовки
  if (isOutside) {
    return null
  }
 
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
});

// Настройки
const client = new ApolloClient({
    // @ts-ignore
    link: authLink.concat(httpLink, logoutLink),
    cache: new InMemoryCache()
});

export default client;
