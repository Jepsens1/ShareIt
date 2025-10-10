import {FormEvent, use, useEffect, useState} from "react";
import type {User} from "../types/user.ts";
import {useNavigate} from "react-router";
import type {LoginResponse} from "../types/response.ts";
import {get, deleteRequest} from "../utils/api.ts";

export default function ProfilePage() {
    const [user, setUser] = useState<User>();
    let tokens: LoginResponse;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const fetchUser = async () => {
        setError(null);
        const stored = localStorage.getItem("social_media_tokens");
        if (!stored) {
            navigate("/signin");
        }
        tokens = JSON.parse(stored);
        setLoading(true);
        try {
            const response = await get("/users/me", {"Content-Type": "application/json", "Authorization": `Bearer ${tokens.access_token}`});
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            setError(`Server error occurred - please try again later: ${error}`);
            console.error("Network/Server error", error);
        } finally {
            setLoading(false);
        }
    }
    const deleteUser = async (e: FormEvent) => {
        setError(null);
        setLoading(true);
        e.preventDefault();
        try {
            await deleteRequest("/users/me", {"Content-Type": "application/json", "Authorization": `Bearer ${tokens.access_token}`});
            navigate("/");
        } catch (error) {
            setError(`Server error occurred - please try again later: ${error}`);
            console.error("Network/Server error", error);
        } finally {
            setLoading(false);
        }
    }
    const handleLogout = async () => {
        localStorage.removeItem("social_media_tokens");
        navigate("/signin", {replace: true});
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className="flex flex-col items-center bg-white pt-8 p-3 h-screen">
            <div className="rounded-xl bg-gray-800 text-green-500
            w-full sm:max-w-2/4 p-5 min-h-11/12">
                <div className="flex justify-between">
                    <h2 className="font-bold text-xl">{user?.full_name}</h2>
                    <form onSubmit={deleteUser}>
                        <button className="text-white border border-white rounded-xl px-3 py-1 hover:bg-red-800 hover:border-red-800 transition-all duration-300 shadow-sm hover:shadow-md">Delete profile</button>
                    </form>
                    <form onSubmit={handleLogout}>
                        <button className="text-white border border-white rounded-xl px-3 py-1 hover:bg-red-800 hover:border-red-800 transition-all duration-300 shadow-sm hover:shadow-md">Sign out</button>
                    </form>
                </div>
                <h3 className="font-bold text-md">@{user?.username}</h3>
                <p className="text-sm">Joined {new Date(user?.created_at).toLocaleString("en-US", {month: "long", year: "numeric"})}</p>
            </div>
        </div>
    )
}