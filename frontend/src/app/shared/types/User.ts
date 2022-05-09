export interface User {
    id: string;
    email: string;
    username: string;
    profileImg: string;
    firstName: string;
    lastName: string;
    
    age?: number;
    bio?: string;
    gender?: string;
    birthDate?: string;
    education?: string;
    interests: string[];

    city: string;
    state: string;
    address: string;
    occupation?: string;
    phoneNumber?: string;
    genderOfInterest: string;
    
    usersLiked: string[];
    languages?: string[];
    usersDisliked: string[];
}

export const defaultUser: User = {
    id: "",
    email: "",
    username: "",
    lastName: "",
    interests: [],
    birthDate: "",
    firstName: "",
    profileImg: "",
    occupation: "",
    age: 18, bio: "",
    
    usersLiked: [],
    usersDisliked: [],
    city: "",
    state: "",
    address: "",
    gender: "MALE",
    genderOfInterest: "FEMALE",
    education: "ensinoFundamental",
}

export interface updateUserInput {
    profileImg?: string;
    firstName?: string;
    username?: string;
    lastName?: string;
    
    age?: number;
    bio?: string;
    gender?: string;
    birthDate?: string;
    education?: string;
    interests?: string[];

    city?: string;
    state?: string;
    address?: string;
    occupation?: string;
    phoneNumber?: string;
    genderOfInterest?: string;
    
    languages?: string[];
    usersDisliked?: string[];
}