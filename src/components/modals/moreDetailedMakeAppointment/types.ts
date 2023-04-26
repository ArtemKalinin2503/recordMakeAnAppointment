import { MakeAppointment } from "../../../api/query/makeAppointment/types"
export interface MoreDetailedProps {
  title: string
  listItems: MakeAppointment
  handleDelete?: () => void
  handleChange?: () => void
}