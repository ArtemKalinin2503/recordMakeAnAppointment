import { Filial } from "../../../api/query/organizations/types";
import {  UserOrganization } from "../../../api/query/users/types";

export interface MakeAppointmentFiltersProps {
  handleGetOrganization?: () => void
  handleGetDivision?: () => void
  handleGetStartDate?: () => void
  handleGetEndDate?: () => void
  organizations: UserOrganization[]
  defaultOrganization: string
  filials: Filial[]
  setSelectOrganization: (value: any) => void
  setSelectFilial: (value: any) => void
  selectOrganization: string
  selectFilial: string
  setDateStart: (value: any) => void
  setDateEnd: (value: any) => void
}

export interface CustomSelectProps {
  label: string
  listItems: any[]
  name: string
  isError: boolean
  onChange: (event: any) => void
  placeholderText?: string
  value?: string
}

export interface CustomDataPickerProps {
  label: string
  name: string
  onChange: (event: any) => void
  placeholderText?: string
}