export default function SideBarIcon({icon, text = 'tooltip', goto}) {
    return (
        <div className="sidebar-icon group">
            <a href={goto}>{icon}</a>
            <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
        </div>
    )
}