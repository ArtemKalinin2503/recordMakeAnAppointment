export interface DeleteTimeIn {
  deleteSlot: {
    isComplete: boolean
    answerId: string
    errCode: number
    errName: string
  }
}

export interface DeleteTimeInput {
  idSlot: string
}