import {type FormEvent, useState} from "react";
import {post} from "../utils/api.ts";
import type {LoginResponse} from "../types/response.ts";
import {useNavigate} from "react-router";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        setError(null);
        setLoading(true);
        e.preventDefault();
        const body = {
            username: username,
            password: password,
            scope: "",
            client_id: "",
            client_secret: "",
        }
        try {
            const response = await post("/auth/token", body, {"Content-Type": "application/x-www-form-urlencoded"})
            const data: LoginResponse = response.data;
            localStorage.setItem("social_media_tokens", JSON.stringify(data));
            navigate("/");
        } catch (error) {
            setError(`Server error — please try again later ${error}`);
            console.error("Network/Server error: ", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                            required/>
                    </div>
                    <button type="submit"
                            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        Login
                    </button>
                    {loading && <p className="text-gray-600 text-lg animate-pulse text-center">Logging in</p>}
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    )
}