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
      images {
        _id
        image
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
`;

export const QUERY_IMAGES = gql` 
  query getImages {
    images {
      _id
      image
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;
