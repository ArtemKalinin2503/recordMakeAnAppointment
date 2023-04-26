import { ThemaList } from '../api/query/themas/types';

// Список тем для таблицы Тем в разделе Темы
export const useThemasListMapper = (response: ThemaList[]) => {
  return (
    response?.map((item: ThemaList) => {
      const { idTopic, topicName, active, avail, totalCount, pagesCont  } = item;
      const dataTableRow = [
        {cellRowData: topicName},
        {cellRowData: avail ? 'Да' : 'Нет'},
      ]
      return {
        dataTableRow,
        rowId: idTopic,
        isActive: active,
        totalCount: totalCount,
        pagesCont: pagesCont
      }
    })
  )
};