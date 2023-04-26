import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import CustomTablePagination from "../customTablePagination";
import IconEye from "../../icons/IconEye";
import { visuallyHidden } from "@mui/utils";
import { CustomTableProps, Order, TableHeadCellsProps } from "./types";
import { tablePaginationData } from "./consts";
import { StyeldIconButton, StyledTableHead  } from "./customTable.styled";
import IconTime from "../../icons/IconTime";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const CustomTableHead = (props: TableHeadCellsProps) => {
  const { order, orderBy, onRequestSort, tableHeaderCells, isDesc, handleSort } = props;

  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);

    if (handleSort) {
      handleSort(isDesc ?? true, property);
    }
  };

  return (
    <StyledTableHead>
      <TableRow>
        <TableCell />
        {tableHeaderCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={isDesc ? 'asc' : 'desc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );
};

// ! Это реиспользоваемый компонент таблицы который выводит таблицу исходя из props tableCells
// ! tableCells - это специальный массив данных который формируется из mapping
// ! mapping это специальные функции которые принимают данные от бекенда
// ! и переименовывают имена свойств объектов которые пришли от бекенда

const CustomTable = ({
  tableHeaderCells,
  tableCells,
  setOpenInfoModal,
  setSelectRowId,
  pageCount,
  setPageCount,
  setGetRowId,
  setOpenTemplateModal,
  handleSort,
  isDesc,
  setIsDesc,
}: CustomTableProps) => {

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isSelected = (row: any) => selected.indexOf(row) !== -1;

  const handleRequestSort: any =(event: React.MouseEvent<unknown>, property: any) => {
    if (setIsDesc) {
      setIsDesc(!isDesc);
    }
    const isAscConst = orderBy === property && order === "asc";
    setOrder(isAscConst ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChange = (event: any, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);

  };

  useEffect(() => {
    if (setSelectRowId) {
      setSelectRowId(selected[0]);
    }
    // Чтобы можно было выбрать только одну строку
    if (selected.length > 1) {
      setSelected([])
    }
  }, [selected])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickMoreInfoRecord = (id: string) => {
    if (setOpenInfoModal) {
      setTimeout(() => {
        setOpenInfoModal(true)
      }, 100);
    }

    if (setGetRowId) {
      setGetRowId(id);
    }
  };

  const handleClickIconTime = (id: string) => {
    if (setGetRowId) {
      setGetRowId(id);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <CustomTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tableCells?.length}
              tableHeaderCells={tableHeaderCells}
              isDesc={isDesc}
              handleSort={handleSort}
            />
            <TableBody>
              {stableSort(tableCells, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  const isItemSelected = isSelected(row);  
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      onClick={(event) => handleChange(event, row.rowId)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onChange={(event) => handleChange(event, row.rowId)}
                          checked={selected[0] === row.rowId}
                        />
                      </TableCell>

                      {/* dataTableRow - нужно всегда следить чтобы данные для таблицы были в массиве dataTableRow */}
                      {/* dataTableRow - а все имена свойств объектов внутри dataTableRow имели имя cellRowData  */}
                      {row?.dataTableRow?.map((item: any) => {
                        return (
                          <>
                            <TableCell align="left">{item.cellRowData}</TableCell>
                          </>
                        );
                      })}

                      {row.isActive === true && (<TableCell>Действует</TableCell>)}
                      
                      {setOpenInfoModal && (
                        <TableCell>
                          <StyeldIconButton onClick={() => handleClickMoreInfoRecord(row.rowId)}>
                            <IconEye />
                          </StyeldIconButton>
                        </TableCell>
                      )}

                      {setOpenTemplateModal && (
                        <TableCell>
                          <StyeldIconButton onClick={() => handleClickIconTime(row.rowId)}>
                            <IconTime isActive />
                          </StyeldIconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[15]}
          count={tablePaginationData.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={() => (
            <CustomTablePagination
              isLastPage={tableCells[0].pagesCont}
              pageCount={pageCount}
              setPageCount={setPageCount}
            />
          )}
          labelDisplayedRows={({ to, count }) => {
            return (
              <div>
                <div>
                  {`Страница ${pageCount} из ${
                    tableCells[0].pagesCont
                  }  ${""}${""}`}
                </div>
                <div>
                  {`Всего: ${count !== -1 ?  tableCells[0].totalCount : `MORE THAN ${to}`}`}
                </div>
              </div>
            );
          }}
        />
      </Paper>
    </Box>
  );
};

export default React.memo(CustomTable);
