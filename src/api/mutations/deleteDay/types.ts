export interface deleteDayIn {
  deleteDay: deleteDay
}

export interface deleteDay {
  isComplete: boolean
  answerId: string
  errCode: number
  errName: string
}

export interface deleteDayInput {
  idDay: string, 
}