import { gql } from "@apollo/client";

export const AUTH_LOGIN = gql`
  mutation loginMitation(
    $email: String!, 
    $password: String!
    ) {
    login (
      email: $email,
      password: $password,
    ) {
      idUser
      login
      nameUser
      token
      roles
      extOrg
      isActive
      mainAdmin
      operator
      admin
    }
  }
`;