export interface ThemaList {
  idTopic: string
  idOrg: string
  topicName: string
  descName: string
  avail: boolean
  active: boolean
  totalCount: number
  pagesCont: number
  selfService: boolean
  idDeptsSelected: []
  idDeptsOthers: []
  spec: boolean
}

export interface ThemasListint {
  getTopicsList: ThemaList[] 
}

export interface ThemaListInput {
  idOrg: string, 
  numberEntriesPage: number, 
  page: number
  idTopic?: string
  typeSorting: string, 
  columnName: string
}

export interface ThemasRedactionInt {
  getDataToReductionTopic: ThemaList
}
export interface ThemasRedactionInput {
  idTopic: string
}