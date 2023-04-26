import { gql } from "@apollo/client";

export const GET_TIME_SLOTS_LIST = gql`
  query getTimeSlotsListQuery($idDept: String, $date: String, $page: Int, $numberEntriesPage: Int, $columnName: String  $typeSorting: String) {
    getSlotsList(idDept: $idDept, date: $date, page: $page, numberEntriesPage: $numberEntriesPage, columnName: $columnName,  typeSorting: $typeSorting) {
      isActive
      dateStart
      dateEnd
      timeInterval
      idTimeInterval
      idDay
      dateFormat
      idTopic
      topicName
      idAppointment
      total
      pagesCount
    }
  }
`;

export const GET_TIME_REDACTION = gql`
  query getTimeRedactionQuery($idDept: String, $idSlot: String, $date: String) {
    getDataToReductionSlot(idDept: $idDept, idSlot: $idSlot, date: $date) {
      isActive
      dateStart
      dateEnd
      timeInterval
      idTimeInterval
      idDay
      dateFormat
      idTopic
      topicName
      idAppointment
      total
      pagesCount

    }
  }
`;
