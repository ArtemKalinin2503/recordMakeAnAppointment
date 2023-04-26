export interface deleteAppointmentIn {
  deleteAppointment: {
    isComplete: boolean
    answerId: string
    errCode: number
    errName: string
  }
}

export interface deleteAppointmentInput {
  makeAppointmentId: string
}