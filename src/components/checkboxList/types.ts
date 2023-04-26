export interface CheckboxProps {
  id: string,
  name: string,
  isChecked?: boolean
}

export interface CheckboxListProps {
  listItems: CheckboxProps[]
  nameField: string
  defaultSelected?: any
}

export interface ListItem {
  id: string
  name: string
  isChecked?: boolean
}
