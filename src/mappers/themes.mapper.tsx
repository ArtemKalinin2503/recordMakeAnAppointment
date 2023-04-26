import { Theme } from "../api/query/organizations/types";

// Темы
export const useThemesMapper = (response: Theme[]) => {
  return (
    response?.map((item: Theme) => {
      const { topicName, idTopic } = item;
      return {
        name: topicName,
        id: idTopic 
      }
    })
  )
};