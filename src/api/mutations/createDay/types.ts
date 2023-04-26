export interface createDayIn {
  addDay: createDay
}

export interface createDay {
  isComplete: boolean
  answerId: string
  errCode: number
  errName: string
}

export interface createDayInput {
  idDept: string, 
  date: string, 
  timeOverlayControl: boolean, 
  avail: boolean
}