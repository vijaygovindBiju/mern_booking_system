import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload(); // Force refresh to update UI state
    };

    return(

        <aside className="sidebar">

            <div className="sidebar-logo">
                <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8 }}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ lineHeight: '1' }}>Booking.io</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '500' }}>Event Management</span>
                </div>
            </div>

            <nav className="sidebar-nav">

                {!user && (
                    <>
                        <NavLink to="/login" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                            <span>Login</span>
                        </NavLink>
                        <NavLink to="/signup" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                            <span>Signup</span>
                        </NavLink>
                    </>
                )}

                {user && user.role === "user" && (
                    <>
                        <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                            <span>Events</span>
                        </NavLink>
                        <NavLink to="/bookings" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                            <span>My Bookings</span>
                        </NavLink>
                    </>
                )}

                {user && user.role === "admin" && (
                    <>
                        <NavLink to="/admin" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                            <span>Admin Panel</span>
                        </NavLink>
                        <NavLink to="/bookings" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                            <span>All Bookings</span>
                        </NavLink>
                        <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                            <span>View Events</span>
                        </NavLink>
                    </>
                )}

                {user && (
                    <button onClick={handleLogout} className="nav-link" style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span>Logout ({user.username})</span>
                    </button>
                )}

            </nav>

        </aside>

    );

};