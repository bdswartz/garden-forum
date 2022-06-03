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
{
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
}
`