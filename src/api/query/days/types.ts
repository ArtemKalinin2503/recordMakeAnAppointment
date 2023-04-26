export interface Day {
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

export interface DaysIn {
  getDaysList: Day[]
}

export interface DaysInput {
  numberEntriesPage: number, 
  page: number, 
  idDept: string, 
  dateStart: string, 
  dateEnd: string,
  columnName: string,
  typeSorting: string
}

export interface DayRedactionInput {
  idDay: string
  idDept: string
}

export interface DayRedactionIn {
  getDataToReductionDay: Day
}