export interface CustomSelectProps {
  label: string;
  listItems: [];
  name: string;
  isError: boolean;
  onChange?: (value: any) => void;
  value?: any
}