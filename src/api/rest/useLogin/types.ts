export interface IUserLoginProps {
  userName: string
  password: string 
}

export interface IDataUserLogin {
  idUser: string
  login: string
  password: string
  nameUser: string
  phone: string
  mail: string
  extOrg: boolean
  roles: [{
    mainAdmin: string
  }]
  token: string
  active: boolean
}

export interface IUserLogin {
  data: IDataUserLogin
}

export interface IUserLoginReturn {
  userInfoLogin: IUserLogin, 
  fetchDataUser: () => void, 
  loadingUserInfoLogin: boolean, 
  errorUserInfoLogin: string, 
  refetchUserInfoLogin: () => void
}