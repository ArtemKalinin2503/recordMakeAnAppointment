export interface CreateTimeSlotInput {
  slotName: string, 
  timeStart: string, 
  timeEnd: string, 
  idTopic: string
  date: string, 
  idDept: string
}

export interface CreateTimeSlotIn {
  addSlot: {
    isComplete: boolean
    answerId: string
    errCode: number
    errName: string
  }
}