export interface CustomSelectGroupProps {
  listItems: [],
  label: string,
  defaultSelected?: string[],
  name: string,
  onChange?: (value: any) => void;
  isEditThema?: boolean
}

export interface ListItem {
  id: string
  name: string
  isChecked?: boolean
}
