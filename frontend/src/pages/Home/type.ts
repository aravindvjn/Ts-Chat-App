export type SingleProfileProps = {
    chat: {
        chat_id?: string;
        friend_id?: string;
        friend_name?: string;
        friend_profile_pic?: string | null;
        friend_username?: string;
        last_message?: string | null;
        last_message_time?: string | null;
        last_message_id?: string | null;
        last_message_sender_id?: string | null;
        last_message_is_read?: boolean | null;
    };
};