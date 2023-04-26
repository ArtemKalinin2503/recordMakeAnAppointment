export interface Filial {
  IdDept: string
  organizationId: string
  nameDept: string
  officialNameDept: string
  descDept: string
  address: string
  mail: string
  phone: string
  active: boolean
}

export interface Theme {
  idOrg: string
  idTopic: string
  topicName: string
  descName: string
  active: boolean
  avail: string
}

export interface FilialsInt {
  getDepts: Filial[]
}

export interface FilialsInput {
  idOrg: string
}

export interface ThemeInt {
  getTopics: Theme[]
}

export interface ThemesInput {
  idOrg: string, 
  idDept: string
}

export interface TimeSlot {
  isActive: boolean
  dateStart: string
  dateEnd: string
  timeInterval: string
  idTimeInterval: string
  idDay: string
  dateFormat: string
  idTopic: string
  topicName: string
}

export interface TimeSlotsIn {
  getTimeSlots: TimeSlot[]
}

export interface TimeSlotInput {
  idDay: string
  idTopic: string
}