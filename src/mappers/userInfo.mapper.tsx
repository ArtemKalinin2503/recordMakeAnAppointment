import { UserOrganization } from "../api/query/users/types"

// Организации
export const useUserInfotMapper = (response: UserOrganization[]) => {
  return (
    response?.map((item: UserOrganization) => {
      const { officialOrganizationName, organizationId } = item;
      return {
        name: officialOrganizationName,
        id: organizationId
      }
    })
  )
};