export interface makeAnAppointmentMut {
  deptAddress: string
  nameOrg: string
  idAppointment: string
  idTimeSlot: string
  clientName: string
  mobilePhone: string
  email: string
  personalAccount: string
  emailNotif: boolean
  idTopic: string
  active: boolean
  entryNumber: string
  comment:string
  idClient: string
  idDay: string
  fromToTimeInterval: string
  timeStart: string
  timeEnd: string
  timeInterval: string
  topicDesc: string
  idDept: string
  idOrg: string
  date: string
  dayOfTheWeek: string
  firstName: string
  middleName: string
  lastName: string
  dateFormat: string
  totalCount: number
  pagesCont: number
}

export interface createMakeAppointmentInt {
  makingAppointment: makeAnAppointmentMut[]
}

export interface createMakeAppointmentInput {
  usId: string,
  organizationId: string,
  idSlot: string, 
  firstName: string, 
  midlName: string, 
  lastName: string,
  phoneUser: string,
  emailUser: string,
  personalAccount: string, 
  notificationMail: boolean, 
  idTopic: string, 
  ClientExternalSystem: null,
  AppealExternalSystem: null, 
  idDept: string, 
  comment: string,
  nameUser: string
}