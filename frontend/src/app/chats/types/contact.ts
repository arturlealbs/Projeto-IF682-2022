export interface Contact {
    lastMessage: string;
    firstName: string;
    lastName: string;
    username: string;
    blocked: boolean;
    gender: string;
    image: string;
    email: string;
    bio: string;
}

export class defaultContact implements Contact {
    lastMessage: string = '';
    blocked: boolean = false;
    firstName: string = '';
    username: string = '';
    lastName: string = '';
    gender: string = '';
    email: string = '';
    image: string = '';
    bio: string = '';
}