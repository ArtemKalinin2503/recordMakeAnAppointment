export interface IAuthLogin {
  login: {
    idUser: string
    login: string
    nameUser: string
    token: string
    roles: any
    extOrg: boolean
    isActive: boolean
    mainAdmin: boolean
    operator: boolean
    admin: boolean
  }
}

export interface IAuthLoginInput {
  email: string
  password: string
}

