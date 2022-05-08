import { User } from '../types/User';

interface UserOrError extends User {
    title?: string;
    reason?: string;
}

export interface CreateResponse { 
    createUser: UserOrError;
    loading: boolean;
}

export interface LikeResponse {
    likeUser: boolean;
}

export interface TokenOrError {
    token?: string;
    title?: string;
    reason?: string;
}

export interface GetTokenResponse { 
    session: TokenOrError
}

interface UserInfo {
    email: string;
    username: string;
    lastName: string;
    firstName: string;
    profileImg: string;
    gender: string;
    bio: string;
}

export interface Relationship {
    contacts: string[];
    blocked: boolean;
    infos: UserInfo[]
}

export interface Relationships {
    relationships: Relationship[]
}