export interface ListItem {
  id: string
  name: string
  isChecked?: boolean
}

export interface SelectTagsProps {
  listItems: ListItem[]
  nameField: string
  label?: string
}