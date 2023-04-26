import { gql } from "@apollo/client";

export const DELETE_DAY = gql`
  mutation deleteDayMutation(
    $idDay: String, 
    ) {
      deleteDay (
        idDay: $idDay,
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;