import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query userGetInfoQuery($userId: String!) {
    getUserInfo(userId: $userId) {
      organizationId
      organizationName
      officialOrganizationName
      nameDesc
      officialOrganizationNameFull
      phone
      avail
      active
    }
  }
`;

