import {type FormEvent, useState} from "react";
import {post} from "../utils/api.ts";
import {useNavigate} from "react-router";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        setError(null);
        e.preventDefault();
        if (confirmPassword !== password) {
            setError("Passwords don't match");
            return;
        }
        setLoading(true);
        const body = {
            username: username,
            password: password,
            full_name: fullName,
        }
        try {
            await post("/users", body, {"Content-Type": "application/json"});
            navigate("/signin");
        } catch (error) {
            setError("Server error — please try again later.");
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
                        <label className="block text-sm font-medium text-gray-700">Full name</label>
                        <input
                            type="text"
                            placeholder="Optional"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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