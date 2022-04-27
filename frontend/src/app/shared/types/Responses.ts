import { User } from '../types/User';

export interface UserOrError extends User {
    title?: string;
    reason?: string;
}

export interface createResponse { 
    createUser: UserOrError;
    loading: boolean;
}

export interface TokenOrError {
    token?: string;
    title?: string;
    reason?: string;
}

export interface getTokenResponse { 
    session: TokenOrError
}