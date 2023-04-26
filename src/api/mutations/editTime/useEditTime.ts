import { gql } from "@apollo/client";

export const EDIT_TIME = gql`
  mutation editTimeMutation(
    $idDay: String,
    $slotName: String, 
    $timeStart: String, 
    $timeEnd: String, 
    $idTopic: String, 
    $idSlot: String
    ) {
    changeSlot (
      idDay: $idDay,
      slotName: $slotName,
      timeStart: $timeStart,
      timeEnd: $timeEnd,
      idTopic: $idTopic,
      idSlot: $idSlot
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;