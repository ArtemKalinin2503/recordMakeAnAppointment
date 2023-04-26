export interface EditMakeAppointmentMut {
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
}

export interface EditMapeAppointmentIn {
  changeAppointment: EditMakeAppointmentMut[]
}

export interface EditMakeAppointmentInput {
  firstName: string
  middleName: string
  lastName: string
  phoneUser: string
  emailUser: string
  personalAccount: string
  appointmentId: string
  comment: string
  notif: boolean
  organizationId: string
}
