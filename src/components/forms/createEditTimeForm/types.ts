import { TimeSlots } from "../../../api/query/timeSlots/types"
import { ThemasMapper } from "../../../mappers/types"

export interface ValuesCreateEditTimeForm {
  day: string
  nameRage: string
  timeStart: string
  timeEnd: string
  theme: string
}

export interface intialValuesCreateEditTimeForm {
  day: string
  nameRage: string
  timeStart: string
  timeEnd: string
  theme: string
  themesOptions: ThemasMapper[]
}

export interface CustomInputProps {
  nameLabel: string
}

export interface CustomSelectProps {
  nameLabel: string
  listItems: []
  placeholderText?: string,
  typePicker?: string
  selectedDateStart?: string
  defaultItems?: string
}

export interface CustomCheckboxListProps {
  nameLabel: string
  listItems: []
}

export interface CreateTimeSlotFormProps {
  themesOptions: ThemasMapper[]
  selectedFilial: string
  refetchTimeSlots: () => void
  setOpen: (value: boolean) => void
  selectedDateStart?: string
  isEdit?: boolean
  selectRowId?: string
  idDay?: string
  defaultValues?: TimeSlots 
}