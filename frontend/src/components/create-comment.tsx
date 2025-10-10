import {type FormEvent, useState} from "react";
import {post} from "../utils/api.ts";

export default function CreateComment({postId, onCommentCreated}: {postId: string, onCommentCreated: () => void}) {

    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const submitComment = async (e: FormEvent) => {
        setError(null);
        setLoading(true);
        e.preventDefault();
        try {
            const response = await post(`/posts/${postId}/comments`, {content: comment}, {"Content-Type": "application/json"});
            console.log(response.data);
            onCommentCreated();
        } catch (error) {
            setError(`Server error occurred - please try again later: ${error}`);
            console.error("Network/Server error", error);
        } finally {
            setLoading(false);
        }
    }
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center max-h-56">
                <p className="text-gray-600 text-lg animate-pulse">Commenting on post</p>
            </div>
        )
    }
    return (
        <div className="flex justify-center max-h-56 pb-8">
            <div className="w-full bg-gray-900 rounded-md shadow-lg">
                <form onSubmit={submitComment} className="flex flex-col gap-4">
                    <div>
                        <textarea rows={2} className="block w-full px-3 py-3 rounded-sm shadow-sm text-sm max-h-20"
                                  value={comment} placeholder="Write your content here..." onChange={e => setComment(e.target.value)}></textarea>
                    </div>
                    <button type="submit" disabled={comment.length === 0}
                            className="w-full max-w-md bg-green-600 text-white font-semibold rounded-sm hover:bg-green-700 transition-colors
                            disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Create Comment
                    </button>
                </form>
                {error && <p className="text-red-500 py-2">{error}</p>}
            </div>
        </div>
    )
}