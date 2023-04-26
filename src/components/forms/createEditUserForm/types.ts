export interface ValuesCreateEditUserForm {
  lastname: string
  name: string
  fullName: string
  phone: string
  email: string
  timeZone: string
  role: string
  organizations: []
}

export interface intialValuesCreateEditUserForm {
  lastname: string
  name: string
  fullName: string
  phone: string
  email: string
  timeZone: string
  role: string
  organizations: []
}

export interface CustomInputProps {
  nameLabel: string
}

export interface CustomSelectProps {
  nameLabel: string
  listItems: []
}