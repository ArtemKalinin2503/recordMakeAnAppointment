export interface Filial {
  name: string
  id: string
}

export interface FilialsMapper {
  name: string
  id: string
}

export interface OrganizationsMapper {
  name: string
  id: string
}

export interface TimesSlotsListMapper {
  dataTableRow: [],
  rowId: string,
  idTopic: string
  idAppointment: string,
  totalCount: number, 
  pagesCont: number
}
export interface ThemasMapper {
  name: string
  id: string
}