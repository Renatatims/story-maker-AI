import { gql } from "@apollo/client";

// Create New user
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

// User Login
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

//Save Story to User's profile
export const SAVE_STORY_AI = gql`
  mutation saveStoryAI($storyData: StoryInput!) {
    saveStoryAI(storyData: $storyData) {
      _id
      storiesAI {
        _id
        title
        stories
        user {
          _id
          firstName
          lastName
          email
        }
      }
    }
  }
`;
