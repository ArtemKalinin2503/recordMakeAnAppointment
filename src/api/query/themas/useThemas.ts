import { gql } from "@apollo/client";

export const GET_THEMES_LIST = gql`
  query themesListQuery($idOrg: String, $numberEntriesPage: Int, $page: Int, $typeSorting: String, $columnName: String) {
    getTopicsList(idOrg: $idOrg, numberEntriesPage: $numberEntriesPage, page: $page, typeSorting: $typeSorting, columnName: $columnName) {
      idTopic
      idOrg
      topicName
      descName
      avail
      active
      totalCount
      pagesCont
      selfService
    }
  }
`;

export const GET_INFO_THEME_REDACTION = gql`
  query getInfoThemeRedaction($idTopic: String) {
    getDataToReductionTopic(idTopic: $idTopic) {
      idTopic
      idOrg
      topicName
      descName
      avail
      active
      totalCount
      pagesCont
      selfService
      idDeptsSelected
      idDeptsOthers
      spec
    }
  }
`;
