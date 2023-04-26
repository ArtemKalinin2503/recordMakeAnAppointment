import { gql } from "@apollo/client";

export const ADD_TOPIC = gql`
  mutation addTopicMutation(
    $idOrg: String, 
    $topicName: String, 
    $descName: String, 
    $selfService: Boolean,
    $avail: Boolean, 
    $spec: Boolean, 
    $listIdDepts: [String]
    ) {
    addTopic (
      idOrg: $idOrg, 
      topicName: $topicName, 
      descName: $descName, 
      selfService: $selfService, 
      avail: $avail, 
      spec: $spec, 
      listIdDepts: $listIdDepts
    ) {
      isComplete
      answerId
      errCode
      errName
    }
  }
`;