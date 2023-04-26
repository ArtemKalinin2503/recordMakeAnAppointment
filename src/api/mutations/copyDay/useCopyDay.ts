import { gql } from "@apollo/client";

export const COPY_DAY = gql`
  mutation copyDayMutation(
    $idDayFrom: String, 
    $date: String
    ) {
      copyDay (
        idDayFrom: $idDayFrom,
        date: $date
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;