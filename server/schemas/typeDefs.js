const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    createdAt: String
    firstName: String
    lastName: String
    username: String
    email: String
    about: String
    posts: [Post]
    plants: [Plant]
    friends: [User]
  }

  type UsersResult {
    users: [User]
  }

  type Plant {
    _id: ID
    createdAt: String
    scientific_name: String
    common_name: String
    description: String
    image_path: String
    usda_zone: String
    pruning: String
    fertilization: String
    water: String
    plantHistory: [PlantHistory]
  }

  type Post {
    _id: ID
    postTitle: String
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
    _id: ID
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
    getUsers(search: String): UsersResult
    posts: [Post]
    post(_id: ID!): Post
    plant(_id: ID!): Plant
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
      about: String
    ): User
    login(email: String!, password: String!): Auth
    addPost(postTitle: String!, postText: String!): Post
    addComment(postId: ID!, commentBody: String!): Post
    addPlantHistory(plantId: ID!, note_body: String): Plant
    removePlantHistory(plantId: ID!, historyId: ID!): Plant
    addPlant(
      scientific_name: String!
      common_name: String!
      image_path: String!
      usda_zone: String
      description: String
      pruning: String
      fertilization: String
      water: String
    ): Plant
    updatePlant(
      plantId: ID!
      common_name: String
      usda_zone: String
      image_path: String
      description: String
      pruning: String
      fertilization: String
      water: String
    ): Plant
    removePlant(plantId: ID!): Plant
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;