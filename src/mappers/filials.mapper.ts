import { Filial } from "../api/query/organizations/types";

// Подразделения
export const useFilialsMapper = (response: Filial[]) => {
  return (
    response?.map((item: Filial) => {
      const { nameDept, IdDept } = item;
      return {
        id: IdDept, 
        name: nameDept,
      }
    })
  )
};