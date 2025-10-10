import {FaHeart} from "react-icons/fa";
import {type FormEvent, useState} from "react";
import {post} from "../utils/api.ts";

export default function LikeComponent({postId, onPostLiked, likeCount}: {postId: string, onPostLiked: () => void, likeCount: number}) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const likePost = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await post(`/posts/${postId}/like`, {}, {"Content-Type": "application/json"});
            console.log(response.data);
            onPostLiked();
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
                <p className="text-gray-600 text-lg animate-pulse">Liking post</p>
            </div>
        )
    }
    return (
        <>
            <form onSubmit={likePost} className="flex gap-4">
                <p><span className="font-semibold">Likes:</span> {likeCount}</p>
                <button type="submit" className="w-full max-w-md"><FaHeart size={24}/></button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </>

    )
}