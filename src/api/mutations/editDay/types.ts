export interface editDayIn {
  changeDay: editDay
}

export interface editDay {
  isComplete: boolean
  answerId: string
  errCode: number
  errName: string
}

export interface editDayInput {
  idDept: string, 
  date: string, 
  timeOverlayControl: boolean, 
  avail: boolean
  idDay: string
}