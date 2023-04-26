export interface RecordingTimesItem {
  timeStart: string,
  timeEnd: string
  isActive: boolean
}

export interface CustomRecordingTimeProps {
  listTimes: any
  handleSelectedTime: (value: any) => void
}

export interface StyledItemWrapperProps {
  isChecked?: boolean
}

export interface StyledStyledItemsTimeWrapperProps {
  viewTypeIsTable: boolean
}

export interface TimeZoneMapper {
  id: string
  timeStart: string
  timeEnd: string
  isActive: boolean
  isChecked?: boolean
  idTimeInterval: string
  dateFormat: string
}