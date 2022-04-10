export interface User {
    id: string,
    name: string
    email: string
    username: string
    profileImg: string
    firstName: string 
    lastName: string 

    age: number,
    bio?: string,
    occupation?: string,
    education?: string,
    interests: string[]
}

export const defaultUser: User = {
    id: "",
    name: "",
    email: "",
    username: "",
    lastName: "",
    firstName: "",
    profileImg: "",
    age: 18, bio: "",
    occupation: "",
    education: "",
    interests: [],
}
