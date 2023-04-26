export interface GetTimesSlotsInput {
  idDept: string 
  date: string
  page: number
  numberEntriesPage: number
  columnName: string,
  typeSorting: string
}

export interface GetTimesSlotsIn {
  getSlotsList: TimeSlots[]
}

export interface TimeSlots {
  isActive: boolean
  dateStart: string
  dateEnd: string
  timeInterval: string
  idTimeInterval: string
  idDay: string
  dateFormat: string
  idTopic: string
  topicName: string
  idAppointment: string
  total: number
  pagesCount: number
}

export interface TimeRedactionIn {
  getDataToReductionSlot: TimeSlots
}

export interface TimeRedactionInput {
  idDept: string, 
  idSlot: string
  date: string
}