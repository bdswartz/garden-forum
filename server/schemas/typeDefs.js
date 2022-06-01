const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Post {
    _id: ID
    postText: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
}


  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addPost(postText: String!): Post
    addComment(postId: ID!, commentBody: String!): Post
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
