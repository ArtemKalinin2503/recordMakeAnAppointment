import { gql } from "@apollo/client";

export const DELETE_THEMA = gql`
  mutation deleteThemaMutation($idTopic: String) {
    deleteTopic (
      idTopic: $idTopic
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;