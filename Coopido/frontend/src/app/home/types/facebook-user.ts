export interface FacebookUser {
    id: string, 
    name: string,
    email: string, 
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