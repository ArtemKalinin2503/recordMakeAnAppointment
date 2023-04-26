import { gql } from "@apollo/client";

export const EDIT_DAY = gql`
  mutation editDayMutation(
    $idDept: String, 
    $date: String, 
    $timeOverlayControl: Boolean, 
    $avail: Boolean, 
    $idDay: String
    ) {
      changeDay (
        idDept: $idDept,
        date: $date,
        timeOverlayControl: $timeOverlayControl,
        avail: $avail,
        idDay: $idDay
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;