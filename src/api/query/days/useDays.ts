import { gql } from "@apollo/client";

export const GET_DAYS_LIST = gql`
  query daysListQuery($numberEntriesPage: Int, $page: Int, $idDept: String, $dateStart: String, $dateEnd: String, $typeSorting: String, $columnName: String) {
    getDaysList(numberEntriesPage: $numberEntriesPage, page: $page, idDept: $idDept, dateStart: $dateStart, dateEnd: $dateEnd, typeSorting: $typeSorting, columnName: $columnName) {
      idDay
      idDept
      freeDate
      dayActive
      timeOverlayControl
      timeOverlayControlString
      avail
      availString
      activeString
      weekday
      slotsCount
      pagesCount
      total
      apptsCount
    }
  }
`;

export const GET_DAY_REDACTION = gql`
  query getDayRedaction($idDay: String, $idDept: String) {
    getDataToReductionDay(idDay: $idDay, idDept: $idDept) {
      idDay
      idDept
      freeDate
      dayActive
      timeOverlayControl
      timeOverlayControlString
      avail
      availString
      activeString
      weekday
      slotsCount
      pagesCount
      total
      apptsCount
    }
  }
`;
