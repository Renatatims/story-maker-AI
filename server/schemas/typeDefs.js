const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    storiesAI: [Story]
  }

  type Story {
    _id: ID!
    title: String
    stories: String
    user: User
  }

  input StoryInput {
    title: String
    stories: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    storiesAI: [Story]
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
  }
`;
module.exports = typeDefs;
