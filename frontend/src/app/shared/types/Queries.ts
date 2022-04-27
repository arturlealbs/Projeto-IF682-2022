import { gql } from 'apollo-angular';

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: CreateUserInput!) {
        createUser(createUserInput: $user) {
            ...on User {
                email
            }
            ...on UserError {
                title
                reason
            }
        }
    }
`;

export const GET_TOKEN_QUERY = gql`
    query GetToken {
        session {
            ...on Token {
                token
            }
            ...on UserError {
                title
                reason
            }
        }
    }
`;

export const GET_USER_BY_EMAIL_OR_USERNAME_QUERY = gql`
    query GetUser {
        user {
            ...on User {
                email
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
            
            ...on UserError {
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