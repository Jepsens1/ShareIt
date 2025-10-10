import {type FormEvent, useState} from "react";
import {post} from "../utils/api.ts";
import {useNavigate} from "react-router";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent) => {
        setError(null);
        setLoading(true);
        e.preventDefault();
        try {
            const response = await post("/posts", {title: title, content: content}, {"Content-Type": "application/json"});
            const postId = response.data.id;
            navigate(`/post/${postId}`);
        } catch (error) {
            setError(`Server error occurred - please try again later: ${error}`);
            console.error("Network/Server error", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 m-3">
                <h2 className="text-2xl font-bold text-center mb-6">Create Post</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" value={title} required onChange={e => setTitle(e.target.value)}
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea rows={10} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm" value={content} placeholder="Write your content here..." onChange={e => setContent(e.target.value)}></textarea>
                    </div>
                    <button type="submit"
                            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        Create
                    </button>
                    {loading && <p className="text-gray-600 text-lg animate-pulse text-center">Uploading Post</p>}
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    )
}