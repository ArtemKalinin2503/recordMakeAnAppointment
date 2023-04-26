import { TimeSlots } from '../api/query/timeSlots/types';

// Временые слоты (раздел Время)
export const useTimesSlotsListMapper = (response: TimeSlots[], handleLinkMakeAppointment: (value: string) => void) => {

  const RecordLink = () => {
    return (
      <>
        <div>Ссылка на запись</div>
      </>
    )
  }

  return (
    response?.map((item: TimeSlots, index: any) => {
      const { dateStart, dateEnd,  topicName, isActive, idTopic, idDay, idTimeInterval, idAppointment, total, pagesCount, timeInterval } = item;
      const dataTableRow = [
        {cellRowData: dateStart},
        {cellRowData: dateEnd},
        {cellRowData: topicName ?? '-'},
        {cellRowData: timeInterval},
        {cellRowData: idAppointment && (
          <div onClick={() => handleLinkMakeAppointment(idAppointment)}>
            <RecordLink />
          </div>
        )},
        {cellRowData: isActive ? 'Действует' : 'Не действует'},
      ]
      return {
        dataTableRow,
        rowId: idTimeInterval,
        idTopic: idTopic,
        idAppointment: idAppointment,
        totalCount: total, 
        pagesCont: pagesCount
      }
    })
  )
};
