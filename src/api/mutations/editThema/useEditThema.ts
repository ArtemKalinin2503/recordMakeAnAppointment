import { gql } from "@apollo/client";

export const EDIT_TOPIC = gql`
  mutation editTopicMutation(
    $idTopic: String, 
    $idOrg: String, 
    $topicName: String,  
    $descName: String,  
    $selfService: Boolean, 
    $avail: Boolean, 
    $spec: Boolean, 
    $listIdDepts: [String]
    ) {
    changeTopic (
      idTopic: $idTopic,
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