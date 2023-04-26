export interface CopyDayInput {
  idDayFrom: string,
  date: string
}

export interface CopyDayIn {
  copyDay: {
    isComplete: boolean
    answerId: string
    errCode: number
    errName: string
  }
}