import { gql } from "@apollo/client";

export const DELETE_MAKE_APPOINTMENT = gql`
  mutation deleteMakeAppointmentMutation(
    $makeAppointmentId: String
  ) {
    deleteAppointment (
      makeAppointmentId: $makeAppointmentId
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;