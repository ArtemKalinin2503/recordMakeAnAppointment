import { makeAnAppointmentMut } from "../../api/mutations/createMakeAppointment/types";

export interface InformationAboutRecordProps {
  dataRecord: makeAnAppointmentMut[]
  setOpen: (value: boolean) => void
  isOutSideRecord?: boolean
}