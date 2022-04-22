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
    birthday?: string;
    occupation?: string;
    education?: string;
    interests: string[];
}

export const defaultUser: User = {
    id: "",
    name: "",
    email: "",
    gender: "",
    username: "",
    lastName: "",
    birthday: "",
    firstName: "",
    education: "",
    profileImg: "",
    occupation: "",
    age: 18, bio: "",
    interests: [],
}
