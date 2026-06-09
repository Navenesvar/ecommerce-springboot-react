import { Link, useNavigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/jwt";
function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = getRoleFromToken();

    console.log("ROLE =", role);

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/products">

                    E-Commerce

                </Link>

                <div>

                    {token ? (
                        <>
    {role === "ADMIN" && (
        <Link
            className="btn btn-warning me-2"
            to="/admin"
        >
            Admin Dashboard
        </Link>
    )}

    <Link
        className="btn btn-outline-light me-2"
        to="/cart"
    >
        Cart
    </Link>

    <Link
        className="btn btn-outline-light me-2"
        to="/orders"
    >
        Orders
    </Link>

    <button
        className="btn btn-danger"
        onClick={logout}
    >
        Logout
    </button>
</>
                    ) : (
                        <>
                            <Link
                                className="btn btn-primary me-2"
                                to="/login">

                                Login
                            </Link>

                            <Link
                                className="btn btn-success"
                                to="/register">

                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;