const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    createdAt: String
    firstName: String
    lastName: String
    username: String
    email: String
    posts: [Post]
    plants: [Plant]
    friends: [User]
  }

  type Plant {
    scientific_name: String
    common_name: String
    image_path: String
    usda_zone: String
    pruning: String
    fertilization: String
    water: String
    plantHistory: [PlantHistory]
  }

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

  type PlantHistory {
    createdAt: String
    note_body: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
    plant(_id: ID!): Plant
    plants(username: String): [Plant]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      username: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(postId: ID!, commentBody: String!): Post
  }
`;

module.exports = typeDefs;
