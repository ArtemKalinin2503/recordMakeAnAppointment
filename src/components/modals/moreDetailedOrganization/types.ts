export interface OrganizationInfo {
  name: string
  title: string
  fullName: string
  description: string
  address: string
  phone: string
  webInterface: string
  settingOrganization?: []
}

export interface MoreDetailedProps {
  title: string
  listItems: OrganizationInfo
  handleDelete: () => void;
  handleChange: () => void;
}