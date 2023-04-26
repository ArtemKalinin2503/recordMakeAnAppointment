import { Day } from "../../../api/query/days/types"
import { FilialsMapper } from "../../../mappers/types"

export interface ValuesCreateEditDaysForm {
  idDept: string,
  date: string,
  settingsRange?: string[],
}

export interface intialValuesCreateEditDaysForm {
  idDept: string,
  date: string,
  timeOverlayControl: boolean,
  avail: boolean,
}

export interface CustomInputProps {
  nameLabel: string
}

export interface CustomSelectProps {
  nameLabel: string
  listItems: []
  placeholderText?: string
  defaultItems?: string
}

export interface CustomCheckboxListProps {
  nameLabel: string
  listItems: []
  defaultItems?: any
}

export interface CreateEditDaysFormProps {
  filials: FilialsMapper[]
  setOpenCreateDaysModal?: (value: boolean) => void
  refetcDaysList: () => void
  selectedDayId?: string
  isEditDay?: boolean
  defaultValues?: Day
  setOpenEditDaysModal?: (value: boolean) => void
}