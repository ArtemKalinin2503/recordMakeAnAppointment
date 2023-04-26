export interface ValuesCreateEditDivisionForm {
  organization: string
  name: string
  title: string
  description: string
  address: string
  coordinates: string
  phone: string
  email: string
  timeZone: string
  dateStart: string
  dateEnd: string
  settingsDivision: []
}

export interface intialValuesCreateEditDivisionForm {
  organization: string
  name: string
  title: string
  description: string
  address: string
  coordinates: string
  phone: string
  email: string
  timeZone: string
  dateStart: string
  dateEnd: string
  settingsDivision: []
}

export interface CustomInputProps {
  nameLabel: string
}

export interface CustomSelectProps {
  nameLabel: string
  listItems: []
  placeholderText?: string
}

export interface CustomCheckboxListProps {
  nameLabel: string
  listItems: []
}