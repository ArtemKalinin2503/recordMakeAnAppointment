export interface ValuesCreateEditOrganizationForm {
  name: string
  title: string
  fullName: string
  description: string
  address: string
  phone: string
  webInterface: string
  settingOrganization: []
}

export interface intialValuesCreateEditOrganizationForm {
  name: string
  title: string
  fullName: string
  description: string
  address: string
  phone: string
  webInterface: string
  settingOrganization: []
}

export interface CustomInputProps {
  nameLabel: string
}

export interface CustomSelectProps {
  nameLabel: string
  listItems: []
}

export interface CustomCheckboxListProps {
  nameLabel: string
  listItems: []
}