import { ThemasRedactionInt } from "../../../api/query/themas/types"
import { UserOrganization } from "../../../api/query/users/types"
import { Filial, FilialsMapper } from "../../../mappers/types"

export interface ISettingsThemas {
  id: string
  name: string
  disabled?: boolean
}

export interface ValuesCreateEditThemeForm {
  organization: string
  name: string
  description: string
  settingsTheme: any,
  filials: any
}

export interface intialValuesCreateEdiThemeForm {
  organization: string
  name: string
  description: string
  settingsTheme: []
  filials: Filial[]
}

export interface CustomInputProps {
  nameLabel: string
}

export interface CustomSelectProps {
  nameLabel: string
  listItems: []
  placeholderText?: string
  defaultFilials?: any
  isEditThema?: boolean
}

export interface CustomCheckboxListProps {
  nameLabel: string
  listItems: []
  defaultItems?: any
}

export interface CreateEditThemeFormProps {
  organizations: UserOrganization[]
  selectOrganizationId?: string
  filials: FilialsMapper[]
  refetchGetThemasList?: () => void
  isEditThema?: boolean
  selectRowId?: string
  setSelectOrganizationId?: (value: string) => void
  themasListData?: ThemasRedactionInt
  setOpenCreateThemeModal?: (value: boolean) => void
  setOpenEditThemeModal?: (value: boolean) => void
}