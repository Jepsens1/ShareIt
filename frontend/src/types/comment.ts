export default interface Comment {
    id: string;
    owner_id: string;
    post_id: string;
    created_at: string;
    last_edited: string | null;
    content: string;
}