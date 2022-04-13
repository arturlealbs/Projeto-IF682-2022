export interface FacebookUser {
    id: string, 
    name: string,
    age?: number,
    email: string, 
    gender?: string,
    birthday?:string,
    username: string,
    lastName: string, 
    firstName: string, 
    profileImg: string
}

export const defaultFacebookUser: FacebookUser = {
    id: "",
    name: "",
    email: "",
    username: "",
    lastName: "",
    firstName: "",
    profileImg: ""
}