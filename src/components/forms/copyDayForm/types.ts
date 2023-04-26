export interface CreateCopyDayFormProps {
  annotation: string
  setOpen: (value: boolean) => void
  handleSubmit: (value: ValuesCreateCopyDayForm) => void
  busyDays?: string[]
  selectRowId?: string
}

export interface ValuesCreateCopyDayForm {
  receptionDay: string
}

export interface intialValuesCreateCopyDayForm {
  receptionDay: string
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
  busyDays?: string[]
  setSelectTimeId: (value: string) => void
}
