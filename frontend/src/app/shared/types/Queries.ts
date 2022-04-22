import { gql } from 'apollo-angular';

export const GET_USER_BY_EMAIL_OR_USERNAME_QUERY = gql`
    query($email: String!, $username: String!) {
        user(searchUserInput: { email: $email, username: $username }) {
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
                workWith
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
            workWith
            interests
            birthDate
            education
            languages
            phoneNumber
            genderOfInterest
        }
    }
`;