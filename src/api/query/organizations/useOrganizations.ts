import { gql } from "@apollo/client";

export const GET_FILIALS = gql`
  query filialsQuery($idOrg: String!) {
    getDepts(idOrg: $idOrg) {
      IdDept
      organizationId
      nameDept
      officialNameDept
      descDept
      address
      mail
      phone
      active
    }
  }
`;

export const GET_THEMES = gql`
  query themesQuery($idOrg: String, $idDept: String) {
    getTopics(idOrg: $idOrg, idDept: $idDept) {
      idOrg
      idTopic
      topicName
      descName
      active
      avail
    }
  }
`;

export const GET_TIME_SLOTES = gql`
  query timeSlotsQuery($idDay:String!, $idTopic: String) {
    getTimeSlots(idDay: $idDay, idTopic: $idTopic) {
      isActive
      dateStart
      dateEnd
      timeInterval
      idTimeInterval
      idDay
      dateFormat
      idTopic
      topicName
    }
  }
`;
