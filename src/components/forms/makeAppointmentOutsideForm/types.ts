export interface ValuesCreateEditMakeAppointmentForm {
  organization: string
  division: string
  themesRecording: string
  lastname: string
  name: string
  fullName: string
  phone: string
  email: string
  accountNumber: string
  comments: string
  receptionDay: string
  notifications: []
  receptionTime: []
}

export interface intialValuesCreateEditMakeAppointmentForm {
  organization: string
  division: string
  themesRecording: string
  lastname: string
  name: string
  fullName: string
  phone: string
  email: string
  accountNumber: string
  comments: string
  receptionDay: string
  notifications: []
  receptionTime: []
}

export interface CustomInputProps {
  nameLabel: string
}

export interface CustomSelectProps {
  nameLabel: string
  listItems: []
  placeholderText?: string
  onChange?: (value: any) => void
  value?: string
  name?: string
  availableDays?: string[]
  setSelectTimeId: (value: string) => void
}

export interface CustomCheckboxListProps {
  nameLabel: string
  listItems: []
}