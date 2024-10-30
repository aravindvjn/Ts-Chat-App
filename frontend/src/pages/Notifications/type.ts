export type FriendRequestProps = {
    request_id?: string;
    sender_id?: string;
    receiver_id?: string;
    status?: 'pending' | 'accepted' | 'rejected';
    created_at?: string;
    updated_at?: string;
    username?: string;
    name?: string;
    profile_pic_url?: string;
}
export type RequestProps={
    req: FriendRequestProps;
}