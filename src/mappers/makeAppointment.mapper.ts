import { MakeAppointment } from '../api/query/makeAppointment/types';

// Запись на прием
export const useMakeAppointmentMapper = (response: MakeAppointment[]) => {
  return (
    response?.map((item: MakeAppointment) => {
      const { dayOfTheWeek, date, fromToTimeInterval, clientName, topicDesc, entryNumber, active, idAppointment, totalCount, pagesCont  } = item;
      const dataTableRow = [
        {cellRowData: dayOfTheWeek},
        {cellRowData: date},
        {cellRowData: fromToTimeInterval},
        {cellRowData: clientName},
        {cellRowData: topicDesc},
        {cellRowData: entryNumber},
      ]
      return {
        dataTableRow,
        rowId: idAppointment,
        isActive: active,
        totalCount: totalCount,
        pagesCont: pagesCont
      }
    })
  )
};