import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ROUTES_OUTSIDE } from "../routes/consts";

// Данная функция распарисивает полученный токен
const parseJwt = () => {
  // @ts-ignore
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    const decoded: any = jwt_decode(token);
    console.log('decoded token: ', decoded);
    return decoded
  }
  return null
};

// Данная функция будет вызываться при каждом перерендере приложения
const AuthVerify: any = (props: any) => {
  const location = useLocation();

  console.log('Проверка авторизации')

  const navigate = useNavigate();

  // @ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));

  // Это условие если пользователь попадает в компонент который не требует авторизации доступен всем ролям
  const isOutside = ROUTES_OUTSIDE.includes(location.pathname);

  useEffect(() => {
    if (token && !isOutside) {
      const decodedJwt = parseJwt();
      // Данное условие проверяет истекло время жизни токена или нет
      if (decodedJwt?.exp * 1000 < Date.now()) {
        console.log('токен истек')
        localStorage.removeItem("token");
        localStorage.removeItem('userId');
        localStorage.removeItem('roles');
        navigate('/login')
      } 
    }
  }, [location, props]);

  // Если пользователь ввел ссылку на роут который не предпологает авторизации и роли
  useEffect(() => {
    if (isOutside) {
      navigate(location.pathname);
    }
  }, [isOutside])

  // Проверка токена в localStorage
  useEffect(() => {
    if (!token && !isOutside) {
      navigate('/login');
      localStorage.removeItem('userId');
      localStorage.removeItem('roles');
    } 
    if (token && !isOutside) {
      navigate('/users');
    }
  }, [isOutside, token])

  return;
};

export default React.memo(AuthVerify);
