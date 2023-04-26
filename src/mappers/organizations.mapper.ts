import { UserOrganization } from "../api/query/users/types";

// Организации
export const useOrganizationsUserMapper = (response: UserOrganization[]) => {
  return (
    response?.map((item: UserOrganization) => {
      const { organizationId, organizationName } = item;
      return {
        id: organizationId, 
        name: organizationName,
      }
    })
  )
};