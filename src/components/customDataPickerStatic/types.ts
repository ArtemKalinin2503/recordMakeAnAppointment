export interface CustomDatePickerStaticProps {
  label?: any;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: any) => void;
  name: string;
  availableDays?: string[]
  busyDays?: string[]
}