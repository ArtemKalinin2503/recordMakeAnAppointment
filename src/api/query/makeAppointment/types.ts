export interface MakeAppointment {
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
  comment: string
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

export interface MakeAppointmentsIn {
  getMakeAppointment: MakeAppointment[]
}

export interface MakeAppointmentInput {
  makeAppointmentId: string
  organizationId: string 
  idDept: string
  dateStart: string
  dateEnd: string
  numberEntriesPage: number 
  page: number
  columnName: string,
  typeSorting: string
}

export interface availableDay {
  idDay: string
  idDept: string
  freeDate: string
  dayActive: boolean
  timeOverlayControl: boolean
  timeOverlayControlString: string
  avail: boolean
  availString: string
  activeString: string
  weekday: string
  slotsCount: number
  pagesCount: number
  total: number
  apptsCount: number
}

export interface availableDaysIn {
  getAvailableDays: availableDay[]
}

export interface availableDaysInput {
  idDept: string
  idTopic: string
}

export interface blockTimeIntervalIn {
  isComplete: boolean
  answerId: string
  errCode: number
  errName: string
}

export interface blockTimeIntervalInput {
  idUser: string 
  idTimeInterval: string
}

export interface getDataToReductionAppointmentIn {
  getDataToReductionAppointment: MakeAppointment
}

export interface getDataToReductionAppointmentInput {
  makeAppointmentId: string
  organizationId: string
}
