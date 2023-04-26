export interface EditThemaIn {
  isComplete: boolean
  answerId: string
  errCode: number
  errName: string
}

export interface EditThemaInput {
  idTopic?: string, 
  idOrg: string, 
  topicName: string,  
  descName: string,  
  selfService: boolean, 
  avail: boolean, 
  spec: boolean, 
  listIdDepts: string[]
}