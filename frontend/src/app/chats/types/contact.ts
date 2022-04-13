export interface Contact {
    lastMessage: string;
    username: string;
    image: string;
}

export class defaultContact implements Contact {
    image: string = '';
    username: string = '';
    lastMessage: string = '';
}