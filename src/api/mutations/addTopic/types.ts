export interface TopicMut {
  isComplete: boolean
  answerId: string
  errCode: number
  errName: string
} 

export interface AddTopicInt {
  getTopicsList: TopicMut
}

export interface AddTopicInput {
  idOrg: string, 
  topicName: string, 
  descName: string,
  selfService: boolean, 
  avail: boolean, 
  spec: boolean
  listIdDepts: string[]
}