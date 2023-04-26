import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { CustomTablePaginationProps } from './types';

const CustomTablePagination = ({
  isLastPage,
  pageCount,
  setPageCount
}:CustomTablePaginationProps) => {
  
  const theme = useTheme();
  
  const handleFirstPageButtonClick = () => {
    setPageCount(1);
  };

  const handleBackButtonClick = () => {
    setPageCount(pageCount - 1);
  };

  const handleNextButtonClick = () => {
    setPageCount(pageCount + 1);
  };

  const handleLastPageButtonClick = () => {
    setPageCount(isLastPage);
  };

  return (
    <>
      <IconButton
        onClick={handleFirstPageButtonClick}
        aria-label="first page"
        disabled={pageCount === 1}
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        aria-label="previous page"
        disabled={pageCount === 1}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={pageCount === isLastPage}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={pageCount === isLastPage}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </>
  );
}

export default CustomTablePagination;