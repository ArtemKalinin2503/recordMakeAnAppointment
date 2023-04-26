import { TimeSlot } from "../api/query/organizations/types";

// Время записи на прием
export const useTimeSlotsMapper = (response: TimeSlot[]) => {
  return (
    response?.map((item: TimeSlot) => {
      const { dateStart, dateEnd, isActive, idDay, idTimeInterval, dateFormat } = item;
      const timeZones = [
        {id: idDay, timeStart: dateStart, timeEnd: dateEnd, isActive: isActive, idTimeInterval: idTimeInterval, isChecked: false, dateFormat: dateFormat}, 
      ]
      return {
        timeZones
      }
    })
  )
};