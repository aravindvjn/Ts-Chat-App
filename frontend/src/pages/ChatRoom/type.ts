export type ChatMessage = {
    chat_id:string;
    sender_id: string;
    receiver_id: string;
    content: string;
    sent_at: string;
    is_read?:boolean;
}
