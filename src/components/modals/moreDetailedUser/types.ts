export interface UserInfo {
  lastname: string
  name: string
  fullName: string
  email: string
  phone: string
  timeZone: string
  role: string
  organizations: string
}

export interface MoreDetailedProps {
  title: string
  listItems: UserInfo
  handleDelete: () => void;
  handleChange: () => void;
}