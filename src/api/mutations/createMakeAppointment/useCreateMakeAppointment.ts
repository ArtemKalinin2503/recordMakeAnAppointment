import { gql } from "@apollo/client";

export const CREATE_MAKE_APPOINTMENT = gql`
  mutation createMakeAppointmentMutation(
    $usId: String,
    $organizationId: String
    $idSlot: String, 
    $firstName: String, 
    $midlName: String, 
    $lastName: String,
    $phoneUser: String,
    $emailUser: String,
    $personalAccount: String, 
    $notificationMail: Boolean, 
    $idTopic: String, 
    $ClientExternalSystem: String,
    $AppealExternalSystem: String, 
    $idDept: String, 
    $comment: String,
    $notificationMail: Boolean
  ) {
    makingAppointment (
      usId: $usId,
      organizationId: $organizationId,
      idSlot: $idSlot, 
      firstName: $firstName, 
      midlName: $midlName, 
      lastName: $lastName,
      phoneUser: $phoneUser,  
      emailUser: $emailUser,
      personalAccount: $personalAccount,
      notificationMail: $notificationMail,
      idTopic: $idTopic,
      ClientExternalSystem: $ClientExternalSystem,
      AppealExternalSystem: $AppealExternalSystem,
      idDept: $idDept,
      comment: $comment,
      notificationMail: $notificationMail
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