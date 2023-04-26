export interface QualityServiceInfo {
  name: string
  question: string
  description: string
  dateReceipt: string
  text: string
  questionDetailed: string
  status: string
}

export interface MoreDetailedProps {
  title: string
  listItems: QualityServiceInfo
  handleDelete: () => void;
  handleChange: () => void;
}