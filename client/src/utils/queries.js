import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
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
query Query($id: ID!) {
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
