import SideBarIcon from "./SideBarIcon.tsx";
import {FaBlog, FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";

export default function SideNavbar() {
    const isLoggedIn = localStorage.getItem("social_media_tokens");
    return (
        <nav>
            <div className="sidebar-nav">
                <SideBarIcon text="Profile" goto="/profile" icon={<FaUser size={28}/>}/>
                <SideBarIcon text="Create Post" goto="/create-post" icon={<FaBlog size={28}/>}/>
                {isLoggedIn ? <SideBarIcon text="Sign out" goto="/signout" icon={<FaSignOutAlt size="28"/>}/> : <SideBarIcon text="Sign in" goto="/login" icon={<FaSignInAlt size="28"/>}/>}
            </div>
        </nav>
    )
}