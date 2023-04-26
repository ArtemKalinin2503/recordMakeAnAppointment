import { gql } from '@apollo/client';

export interface AddUserInput {
  name: string;
  age: string;
};

export interface AddUserData {
  name: string;
};

export const ADD_USER = gql`
    mutation addUser($name: String!, $age: String!) {
        addUser(name: $name, age: $age) {
          name
        }
    }
`;

