import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {get, post} from "./api.ts";
import StatusCodes from "./statuscodes.ts";
import type {LoginResponse} from "../types/response.ts";

export default function ProtectedRoutes() {
    const stored = localStorage.getItem("social_media_tokens");
    const navigate = useNavigate();

    const verifyToken = async () => {
        if (!stored) {
            navigate("/signin", { replace: true });
            return;
        }
        try{
            const tokens = JSON.parse(stored);
            const response = await get("/users/me", {"Authorization": `Bearer ${tokens.access_token}`});
            if(response.status === StatusCodes.UNAUTHORIZED) {
                //retry with refresh_tokens
                console.log("retrying")
                const retry = await post(`/auth/refresh/${tokens.access_token}`);
                if (retry.status === StatusCodes.UNAUTHORIZED) {
                    localStorage.removeItem("social_media_tokens");
                    navigate("/signin", { replace: true });
                    return;
                }
                const newTokens: LoginResponse = retry.data
                localStorage.setItem("social_media_tokens", JSON.stringify(newTokens));
            }
        } catch (error) {
            console.error("Token verification failed: ", error);
            localStorage.removeItem("social_media_tokens");
            navigate("/signin", { replace: true });
        }

    }
    useEffect(() => {
        verifyToken();
    }, [stored]);
    return stored ? <Outlet/> : null;
}