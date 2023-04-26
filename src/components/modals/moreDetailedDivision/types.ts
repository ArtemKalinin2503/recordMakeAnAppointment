export interface DivisionInfo {
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
  listItems: DivisionInfo
  handleDelete: () => void
  handleChange: () => void
}