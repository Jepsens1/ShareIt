import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {get} from "../utils/api.ts";
import type {Post} from "../types/post.ts";

export default function PostDetail() {
    const params = useParams();
    const [postDetail, setPostDetail] = useState<Post>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fetchPost = async () => {
        console.log(params.postId);
        setError(null);
        setLoading(true);
        try {
            const response = await get(`/posts/${params.postId}?include_comments=true`, {"Content-Type": "application/json"})
            setPostDetail(response.data);
        } catch (error) {
            setError(`Server error occurred - please try again later: ${error}`);
            console.error("Network/Server error", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPost();
    }, []);
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <p className="text-red-600 font-bold">Error occurred {error}</p>
                <button
                    onClick={fetchPost}
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
        <div className="flex flex-col items-center bg-gray-50 pt-8 p-2 h-screen">
            <div className="rounded-xl bg-gray-800 text-green-500
            w-full sm:max-w-3/4 p-5 min-h-11/12">
                <h3 className="font-bold text-lg mb-1">{postDetail?.title}</h3>
                <p className="text-sm">{postDetail?.content}</p>

                <div className="text-xs text-gray-400 mt-auto">
                    <p><span className="font-semibold">Likes:</span> {postDetail?.likes_count}</p>
                    <p><span className="font-semibold">Comments:</span> {postDetail?.comments_count}</p>
                </div>
                <div className="flex flex-col items-end text-[10px] text-gray-400 mt-auto ">
                    <p><span className="font-semibold">ID:</span> {postDetail?.id}</p>
                    <p><span className="font-semibold">Created at:</span> {new Date(postDetail?.created_at).toLocaleString()}</p>
                    {postDetail?.updated_at && (
                        <p><span className="font-semibold">Last Edited:</span> {new Date(postDetail?.updated_at).toLocaleString()}</p>
                    )}
                </div>
                <div className="flex flex-col w-full max-h-64 overflow-y-auto bg-gray-900 rounded-lg p-3 space-y-2">
                    {postDetail?.comments?.length ? (
                        postDetail.comments.map((comment) => (
                            <div key={comment.id} className="w-full text-sm text-gray-200 border-b border-gray-700 pb-1">
                                <p>{comment.content}</p>
                                <p className="text-[10px] text-gray-500">By {comment.owner_id}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 italic text-sm">No comments yet. Be the first to comment</p>
                    )}
                </div>
            </div>
        </div>
    )
}