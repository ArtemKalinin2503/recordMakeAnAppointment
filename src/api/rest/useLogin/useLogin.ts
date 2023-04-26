import axios from 'axios'
import { useEffect, useState } from "react";
import { MAIN_URL_SERVER } from "../../../main-config";
import { IDataUserLogin, IUserLogin } from './types';

// Hooks для авторизации
const useLogin = () => {
  const [userInfoLogin, setUserInfoLogin] = useState<IDataUserLogin>();
  const [errorUserInfoLogin, setErrorUserInfoLogin] = useState<string>('');
  const [loadingUserInfoLogin, setLoadingUserInfoLogin] = useState<boolean>(false);
  const [reload, setReload] = useState(0);

  const refetchUserInfoLogin = () => setReload(prev => prev + 1);

  // Rest запрос авторизации
  const fetchDataUser  = async (userName: string, password: string ) => {
    try {
      setLoadingUserInfoLogin(true);
      const res: IUserLogin  = await axios.post(`${MAIN_URL_SERVER}/login`, { userName, password }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      setUserInfoLogin(res.data);
      localStorage.setItem('token', JSON.stringify(res.data.token));
    } catch(err: any) {
      setErrorUserInfoLogin(err.message);
      setLoadingUserInfoLogin(false)
    } finally {
      setLoadingUserInfoLogin(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    return () => controller.abort();
  }, [reload]);

  return [userInfoLogin, fetchDataUser, loadingUserInfoLogin, errorUserInfoLogin, refetchUserInfoLogin]
}

export default useLogin;

