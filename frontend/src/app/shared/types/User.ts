export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    profileImg: string;
    firstName: string;
    lastName: string;
    
    age?: number;
    bio?: string;
    gender?: string;
    birthDate?: string;
    occupation?: string;
    education?: string;
    interests: string[];

    city?: string;
    state?: string;
    address?: string;
    workWith?: string;
    phoneNumber?: string;
    languages?: string[];
    genderOfInterest?: string;
}

export const defaultUser: User = {
    id: "",
    name: "",
    email: "",
    gender: "male",
    username: "",
    lastName: "",
    birthDate: "",
    firstName: "",
    education: "",
    profileImg: "",
    occupation: "",
    age: 18, bio: "",
    interests: [],
}
