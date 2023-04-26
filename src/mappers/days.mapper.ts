import { Day } from '../api/query/days/types';

// Дни
export const useDaysMapper = (response: Day[]) => {
  return (
    response?.map((item: Day) => {
      const { weekday, freeDate, availString, slotsCount, apptsCount, activeString, total, pagesCount, idDay } = item;
      const dataTableRow = [
        {cellRowData: weekday},
        {cellRowData: freeDate},
        {cellRowData: availString},
        {cellRowData: slotsCount},
        {cellRowData: apptsCount},
        {cellRowData: activeString},
      ]
      return {
        dataTableRow,
        rowId: idDay,
        totalCount: total,
        pagesCont: pagesCount
      }
    })
  )
};