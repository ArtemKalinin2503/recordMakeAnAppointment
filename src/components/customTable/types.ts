export type Order = 'asc' | 'desc'

export interface EnhancedTableToolbarProps {
  numSelected: number
}

export interface HeadCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

export interface TableHeadCellsProps {
  tableHeaderCells: HeadCell[]
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void
  order: Order
  orderBy: string
  rowCount: number
  handleSort?: (value: boolean, name: string) => void
  isDesc?: boolean
  setIsDesc?: (value: boolean) => void
}

export interface CustomTableProps {
  tableHeaderCells: HeadCell[]
  tableCells: any[]
  setOpenInfoModal?: (value: boolean) => void
  setSelectRowId?: (value: string) => void
  pageCount: number
  setPageCount: (value: number) => void
  setGetRowId?: (value: string) => void
  setOpenTemplateModal?: (value: boolean) => void
  handleSort?: (value: boolean, name: string) => void
  isDesc?: boolean
  setIsDesc?: (value: boolean) => void
}