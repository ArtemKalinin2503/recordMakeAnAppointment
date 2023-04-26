import { gql } from "@apollo/client";

export const EDIT_MAKE_APPOINTMENT = gql`
  mutation editMakeAppointmentMutation(
    $firstName: String
    $middleName: String
    $lastName: String
    $phoneUser: String
    $emailUser: String
    $personalAccount: String
    $appointmentId: String
    $comment: String
    $organizationId: String
    $notif: Boolean
  ) {
    changeAppointment(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      phoneUser: $phoneUser
      emailUser: $emailUser
      personalAccount: $personalAccount
      appointmentId: $appointmentId
      comment: $comment
      organizationId: $organizationId
      notif: $notif
    ) {
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
      dateFormat
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
