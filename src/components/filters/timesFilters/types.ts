import { FilialsMapper, OrganizationsMapper } from "../../../mappers/types"

export interface CustomSelectProps {
  label: string
  listItems: any[]
  name: string
  isError: boolean
  onChange: (event: any) => void
  placeholderText?: string
  value: string
}

export interface CustomDataPickerProps {
  label: string
  name: string
  onChange: (event: any) => void
  placeholderText?: string
}

export interface TimesFiltersProps {
  organizations: OrganizationsMapper[]
  selectOrganization: string
  setSelectOrganization: (value: string) => void
  filials: FilialsMapper[]
  selectedFilial: string,
  setSelectedFilial: (value: string) => void
  setSelectedDateStart: (value: string) => void
  selectedDateStart: string
}