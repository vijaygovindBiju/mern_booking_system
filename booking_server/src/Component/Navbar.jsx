import { Link } from "react-router-dom";

export const Navbar = ()=>{

    return(

        <nav>

            <Link to="/">
                Events
            </Link>

            {" | "}

            <Link to="/book">
                Book Ticket
            </Link>

            {" | "}

            <Link to="/bookings">
                Bookings
            </Link>

            {" | "}

            <Link to="/admin">
                Admin
            </Link>

        </nav>

    );

};