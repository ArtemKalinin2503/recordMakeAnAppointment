import { gql } from "@apollo/client";

export const DELETE_TIME = gql`
  mutation deleteTimeMutation($idSlot: String) {
    deleteSlot (
      idSlot: $idSlot
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;