import { UserOrganization } from "../../../api/query/users/types"

export interface CustomSelectProps {
  label: string
  listItems: any[]
  name: string
  isError: boolean
  onChange: (event: any) => void
}

export interface themasFiltersInt {
  organizations: UserOrganization[]
  selectOrganization: string
  setSelectOrganization: (value: string) => void
}