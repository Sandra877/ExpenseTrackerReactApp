import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/");
    };

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle md:hidden">
                            <FaBars />
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <NavLink to="/landingpage">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About</NavLink>
                            </li>
                             <li>
                                <NavLink to="/contactus">Contact Us</NavLink>
                            </li>

                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <NavLink to="/register">Register</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
                {/* hide these on small screens */}
                <div className="navbar-center hidden md:flex">
                    <ul
                        tabIndex={-1}
                        className="menu menu-horizontal dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
                        <li>
                            <NavLink to="/landingpage">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                            <li>
                                <NavLink to="/contactus">Contact Us</NavLink>
                            </li>

                    </ul>
                </div>

                {/* hide these on small screens */}
                <div className="navbar-end hidden md:flex">
                    <ul
                        tabIndex={-1}
                        className="menu menu-horizontal dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
                        {!isAuthenticated ? (
                            <>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        )}

                    </ul>
                </div>
            </div>

        </div>
    )
}
export default Navbar