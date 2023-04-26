export interface ThemeInfo {
  organization: string
  name: string
  title: string
  description: string
  address: string
  phone: string
  email: string
}

export interface MoreDetailedProps {
  title: string
  listItems: ThemeInfo
  handleDelete: () => void
  handleChange: () => void
}