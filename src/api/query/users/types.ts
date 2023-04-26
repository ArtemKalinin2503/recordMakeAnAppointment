export interface UserOrganization {
  organizationId: string
  organizationName: string
  officialOrganizationName: string
  nameDesc: string
  officialOrganizationNameFull: string
  phone: string
  avail: boolean
  active: boolean
}

export interface UserInfoInt {
  getUserInfo: UserOrganization[]
}

export interface UserInfoInput {
  userId: string
}