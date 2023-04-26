import { gql } from "@apollo/client";

export const GET_MAKE_APPOINTMENT = gql`
  query makeAppointmentQuery(
    # Параметры
    $organizationId: String, 
    $idDept: String, 
    $dateStart: String, 
    $dateEnd: String, 
    $makeAppointmentId: String, 
    $numberEntriesPage: Int,
    $page: Int,
    $typeSorting: String, 
    $columnName: String
    ) {
    getMakeAppointment(
      organizationId: $organizationId, 
      idDept: $idDept, 
      dateStart: $dateStart, 
      dateEnd: $dateEnd,
      makeAppointmentId: $makeAppointmentId,
      numberEntriesPage: $numberEntriesPage, 
      page: $page,
      typeSorting: $typeSorting, 
      columnName: $columnName
    ) 
    # Отдаваемые данные
    {
      deptAddress
      nameOrg
      idAppointment
      idTimeSlot
      clientName
      mobilePhone
      email
      personalAccount
      emailNotif
      idTopic
      active
      entryNumber
      comment
      idClient
      idDay
      fromToTimeInterval
      timeStart
      timeEnd
      timeInterval
      topicDesc
      idDept
      idOrg
      date
      dayOfTheWeek
      firstName
      middleName
      lastName
      totalCount
      pagesCont
    }
  }
`;

export const GET_AVAILABLE_DAYS = gql`
  query availableDaystQuery($idDept: String, $idTopic: String) {
    getAvailableDays(idDept: $idDept, idTopic: $idTopic) {
      idDay
      idDept
      freeDate
      dayActive
    }
  }
`;

export const BLOCK_TIME_INTERVAL = gql`
  query blockTimeIntervalQuery($idUser: String, $idTimeInterval: String) {
    blockTimeInterval(idUser: $idUser, idTimeInterval: $idTimeInterval) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;

export const FOR_REDUCTION_DATA_APPOINTMENT = gql`
  query getDataToReductionAppointmentQuery($makeAppointmentId: String, $organizationId: String) {
    getDataToReductionAppointment(makeAppointmentId: $makeAppointmentId, organizationId: $organizationId) {
      deptAddress
      nameOrg
      idAppointment
      idTimeSlot
      clientName
      mobilePhone
      email
      personalAccount
      emailNotif
      idTopic
      active
      entryNumber
      comment
      idClient
      idDay
      fromToTimeInterval
      timeStart
      timeEnd
      timeInterval
      topicDesc
      idDept
      idOrg
      date
      dayOfTheWeek
      firstName
      middleName
      lastName
      totalCount
      pagesCont
    }
  }
`;