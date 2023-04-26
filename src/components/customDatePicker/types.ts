export interface CustomDatePickerProps {
  placeholderText?: string
  isDatePicker?: boolean
  isTimePicker?: boolean
  handleChange: (value: string) => void
  value?: string
  selectedDateStart?: string
  setSelectedDateStart?: (value: string) => void
}