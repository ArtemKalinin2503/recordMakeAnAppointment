import { gql } from "@apollo/client";

export const CREATE_TIME_SLOT = gql`
  mutation createTimeSlotMutation(
    $idDept: String
    $slotName: String, 
    $timeStart: String, 
    $timeEnd: String, 
    $idTopic: String
    $date: String
    ) {
      addSlot (
        idDept: $idDept,
        slotName: $slotName,
        timeStart: $timeStart,
        timeEnd: $timeEnd,
        idTopic: $idTopic,
        date: $date
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;