export interface EditTimeIn {
  changeSlot: {
    isComplete: boolean
    answerId: string
    errCode: number
    errName: string
  }
}

export interface EditTimeInput {
  idDay: string, 
  slotName: string, 
  timeStart: string, 
  timeEnd: string, 
  idTopic: string, 
  idSlot: string
}