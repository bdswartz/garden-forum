import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      createdAt
      firstName
      lastName
      username
      email
      posts {
        _id
        postText
        createdAt
        username
      }
      plants {
        scientific_name
        common_name
        image_path
        usda_zone
        pruning
        fertilization
        water
        plantHistory {
          createdAt
          note_body
        }
      }
      friends {
        username
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query Users {
    users {
      _id
      createdAt
      firstName
      lastName
      username
      email
      plants {
        _id
        scientific_name
        common_name
        image_path
        usda_zone
        pruning
        fertilization
        water
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      _id
      createdAt
      firstName
      lastName
      username
      email
      posts {
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
      plants {
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
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_POSTS = gql`
query QUERY_POSTS {
  posts {
    _id
    postText
    createdAt
    username
    commentCount
  }
}`

export const QUERY_PLANT = gql`
query QUERY_PLANT($id: ID!) {
  plant(_id: $id) {
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
}`

export const QUERY_POST = gql`
query QUERY_POST($id: ID!) {
  post(_id: $id) {
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
