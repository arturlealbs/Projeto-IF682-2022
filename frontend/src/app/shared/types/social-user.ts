export interface SocialUser {
    id: string;
    provider: string;

    email: string;
    username: string;
    profileImg: string;
    firstName: string;
    lastName: string;
    
    age?: number;
    gender?: string;
    birthDate?: string;
}
