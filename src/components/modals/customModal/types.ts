export interface CustomModalProps {
  title: string
  children?: JSX.Element
  open: boolean
  setOpen: (value: boolean) => void
}