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

// Save Story to User's profile
export const SAVE_STORY_AI = gql`
  mutation saveStory($storyData: StoryInput!) {
    saveStory(storyData: $storyData) {
      _id
      storiesAI {
        _id
        title
        stories
        image {
          _id
          image
        }
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

// Update Story Title
export const UPDATE_STORY_TITLE = gql`
  mutation updateStoryTitle($storyId: ID!, $title: String!) {
    updateStoryTitle(storyId: $storyId, title: $title) {
      _id
      title
    }
  }
`;

// Save Image to User's profile
export const SAVE_IMAGE = gql`
  mutation saveImage($imageData: ImageInput!) {
    saveImage(imageData: $imageData) {
      _id
      images {
        _id
        image
      }
    }
  }
`;