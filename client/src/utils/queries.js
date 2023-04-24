import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
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

export const QUERY_STORIES_AI = gql`
  query getStoriesAI {
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
`;
