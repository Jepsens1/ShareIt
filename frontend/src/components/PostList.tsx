import {useEffect, useState} from "react";
import api from "../utils/api.ts";
import PostCard from "./PostCard.tsx";
import type {Post} from "../types/post.ts";


export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPosts = async () => {
        setError(null);
        setLoading(true)
        await api.get("/posts")
            .then(function (response) {
                //handle success
                setPosts(response.data);
                setLoading(false);
            }).catch(function (error) {
                    if(error.response?.status === 429) {
                        setError("Rate limit exceeded.");
                    }
                    else {
                        const message = error.response?.data?.message ||
                        error.message ||
                        "Unknown error occurred while fetching posts.";
                        setError(message);
                    }
                console.log("Error fetching posts...", error);
            })
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
        <div className="bg-gray-50 grid gap-4
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}