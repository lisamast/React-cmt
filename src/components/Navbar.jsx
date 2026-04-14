import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <nav>
            {!isLoggedIn ? (
                <Link to="/login">Login</Link>
            ) : (
                <>
                    <Link to="/">Dashboard</Link>
                    <Link to="/login" onClick={logout}>
                        Uitloggen
                    </Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;