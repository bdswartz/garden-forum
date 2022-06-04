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

export const ADD_PLANT = gql`
  mutation ADD_PLANT($scientificName: String!, $commonName: String!, $imagePath: String!, $usdaZone: String, $pruning: String, $fertilization: String, $water: String, ) {
    addPlant(scientific_name: $scientificName, common_name: $commonName, image_path: $imagePath, usda_zone: $usdaZone, pruning: $pruning, fertilization: $fertilization, water: $water) {
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

export const ADD_POST = gql`
  mutation ADD_POST($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      createdAt
      username
    }
  }
`

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
}`

