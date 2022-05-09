import { gql } from 'apollo-angular';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(createUserInput: $user) {
      ... on User {
        email
      }
      ... on UserError {
        title
        reason
      }
    }
  }
`;

export const GET_TOKEN_QUERY = gql`
  query GetToken {
    session {
      ... on Token {
        token
      }
      ... on UserError {
        title
        reason
      }
    }
  }
`;

export const GET_RELATIONSHIPS = gql`
  query GetRelationships {
    relationships {
      contacts
      blocked
      infos {
        email
        username
        firstName
        lastName
        gender
        profileImg
        bio
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      ... on User {
        email
        profileImg
        firstName
        lastName
        username
        age
        bio
        city
        state
        gender
        address
        occupation
        interests
        birthDate
        education
        languages
        phoneNumber
        genderOfInterest
        usersLiked
        usersDisliked
      }

      ... on UserError {
        title
        reason
      }
    }
  }
`;

export const GET_USER_LIST = gql`
  query GetUserList {
    users {
      email
      profileImg
      firstName
      lastName
      username
      age
      bio
      city
      state
      gender
      address
      occupation
      interests
      birthDate
      education
      languages
      phoneNumber
      genderOfInterest
    }
  }
`;

export const UPDATE_RELATIONSHIP = gql`
  mutation UpdateRelationship($relationship: UpdateRelationshipInput!) {
    updateRelationship(updateRelationshipInput: $relationship) {
      contacts
      blocked
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($newUser: UpdateUserInput!) {
    updateUser(updateUserInput: $newUser) {
      ... on User {
        usersLiked
        usersDisliked
      }
      ... on UserError {
        title
        reason
      }
    }
  }
`;

export const LIKE_USER_MUTATION = gql`
  mutation LikeUser($likedUser: LikeUserInput!) {
    likeUser(likeUserInput: $likedUser)
  }
`;

