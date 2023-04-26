export interface RadioItem {
  id: string | number
  name: string
}

export interface CustomRadioGroupProps {
  listItems: RadioItem[]
  label?: string
  name: string
  isError: boolean
}