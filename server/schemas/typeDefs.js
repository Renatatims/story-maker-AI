const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    stories: [Story]
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
  type Query {
    user: User
    stories: [Story]
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    saveStory(storyData: StoryInput!): User
  }
`;
module.exports = typeDefs;
