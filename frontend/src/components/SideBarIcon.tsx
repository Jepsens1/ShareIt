import {Link} from "react-router";

export default function SideBarIcon({icon, text = 'tooltip', goto}) {
    return (
        <div className="sidebar-icon group">
            <Link to={goto}>{icon}</Link>
            <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
        </div>
    )
}