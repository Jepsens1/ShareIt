import {useEffect, useState} from "react";
import {get} from "../utils/api.ts";
import PostCard from "./PostCard.tsx";
import type {Post} from "../types/post.ts";
import StatusCodes from "../utils/statuscodes.ts";


export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchPosts = async () => {
        setError(null);
        setLoading(true)
        try{
            const response = await get("/posts");
            setPosts(response.data);
        } catch (error) {
            if (error.response?.status === StatusCodes.RATE_LIMIT_EXCEEDED) {
                setError("Rate limit exceeded");
            } else {
                const message = error.response?.data?.message ||
                    error.message ||
                    "Unknown error occurred while fetching posts.";
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, []);

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <p className="text-red-600 font-bold">Error occurred {error}</p>
                <button
                    onClick={fetchPosts}
                    className="mt-4 px-4 py-2 bg-gray-800 text-green-500 rounded-lg hover:bg-green-600 hover:text-white
                 font-bold text-sm transition">
                    Try again
                </button>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
            <p className="text-gray-600 text-lg animate-pulse">Fetching Post</p>
            </div>
        )
    }
    return (
        <div className="bg-gray-50 flex flex-col gap-2 p-2 pt-8
        sm:justify-center sm:items-center">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}