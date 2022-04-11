export interface MessageText {
    text: string;
    timestamp: string;
}

export default interface ChatMessage {
    to: string;
    from: string;
    messages: MessageText[];
}