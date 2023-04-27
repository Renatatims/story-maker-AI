const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    storiesAI: [Story]
    images: [Image]
  }

  type Story {
    _id: ID!
    title: String
    stories: String
    user: User
    image: Image
  }

  type Image { 
    _id: ID!
    image: String
    user: User
  }

  input StoryInput {
    title: String
    stories: String!
  }

  input ImageInput { 
    image: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    storiesAI: [Story]
    images: [Image]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    saveStory(storyData: StoryInput!): User
    saveImage(imageData: ImageInput!): User
  }
`;
module.exports = typeDefs;
