import { NavLink } from "react-router-dom";

export const Navbar = ()=>{

    return(

        <aside className="sidebar">

            <div className="sidebar-logo">
                <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8 }}></div>
                <span>Booking.io</span>
            </div>

            <nav className="sidebar-nav">

                <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                    <span>Events</span>
                </NavLink>

                <NavLink to="/bookings" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                    <span>Bookings</span>
                </NavLink>

                <NavLink to="/admin" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                    <span>Admin</span>
                </NavLink>

            </nav>

        </aside>

    );

};