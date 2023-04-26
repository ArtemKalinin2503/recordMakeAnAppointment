import { gql } from "@apollo/client";

export const CREATE_DAY = gql`
  mutation createDayMutation(
    $idDept: String, 
    $date: String, 
    $timeOverlayControl: Boolean, 
    $avail: Boolean
    ) {
      addDay (
        idDept: $idDept,
        date: $date,
        timeOverlayControl: $timeOverlayControl,
        avail: $avail
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;