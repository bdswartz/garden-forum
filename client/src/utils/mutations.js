import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $about: String
    $email: String
    $firstName: String
    $lastName: String
  ) {
    updateUser(
      about: $about
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      createdAt
      firstName
      lastName
      username
      email
      about
      friends {
        createdAt
        firstName
        lastName
        username
        email
        about
      }
    }
  }
`;

export const ADD_PLANT = gql`
  mutation ADD_PLANT(
    $scientificName: String!
    $commonName: String!
    $imagePath: String!
    $usdaZone: String
    $pruning: String
    $fertilization: String
    $water: String
  ) {
    addPlant(
      scientific_name: $scientificName
      common_name: $commonName
      image_path: $imagePath
      usda_zone: $usdaZone
      pruning: $pruning
      fertilization: $fertilization
      water: $water
    ) {
      _id
      createdAt
      scientific_name
      common_name
      image_path
      water
      fertilization
      pruning
      usda_zone
    }
  }
`;

export const UPDATE_PLANT = gql`
  mutation UPDATE_PLANT(
    $plantId: ID!
    $usdaZone: String
    $pruning: String
    $fertilization: String
    $water: String
    $commonName: String!
  ) {
    updatePlant(
      plantId: $plantId
      usda_zone: $usdaZone
      pruning: $pruning
      fertilization: $fertilization
      water: $water
      common_name: $commonName
    ) {
      _id
      createdAt
      scientific_name
      common_name
      image_path
      usda_zone
      pruning
      fertilization
      water
    }
  }
`;

export const REMOVE_PLANT = gql`
  mutation REMOVE_PLANT($plantId: ID!) {
    removePlant(plantId: $plantId) {
      _id
      createdAt
      scientific_name
      common_name
      image_path
      usda_zone
      pruning
      fertilization
      water
      plantHistory {
        _id
        createdAt
        note_body
      }
    }
  }
`;

export const ADD_PLANT_HISTORY = gql`
  mutation ADD_PLANT_HISTORY($plantId: ID!, $noteBody: String) {
    addPlantHistory(plantId: $plantId, note_body: $noteBody) {
      _id
      createdAt
      scientific_name
      common_name
      image_path
      plantHistory {
        createdAt
        note_body
      }
      usda_zone
      pruning
      fertilization
      water
    }
  }
`;

export const REMOVE_HISTORY = gql`
  mutation REMOVE_HISTORY($plantId: ID!, $historyId: ID!) {
    removePlantHistory(plantId: $plantId, historyId: $historyId) {
      _id
      createdAt
      scientific_name
      common_name
      image_path
      usda_zone
      pruning
      fertilization
      water
      plantHistory {
        _id
        createdAt
        note_body
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation ADD_POST($postTitle: String!, $postText: String!) {
    addPost(postTitle: $postTitle, postText: $postText) {
      _id
      postTitle
      postText
      createdAt
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation ADD_COMMENT($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      postText
      createdAt
      username
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation ADD_FRIEND($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      createdAt
      firstName
      lastName
      username
      email
      friends {
        _id
        createdAt
        firstName
        lastName
        username
        email
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation REMOVE_FRIEND($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      createdAt
      firstName
      lastName
      username
      email
      friends {
        _id
        createdAt
        firstName
        lastName
        username
        email
      }
    }
  }
`;
