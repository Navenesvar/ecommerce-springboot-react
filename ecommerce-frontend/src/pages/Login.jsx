import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/users/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login Successful");

            navigate("/products");

        } catch (error) {

            alert("Invalid Email Or Password");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#0f172a,#1e293b,#334155)"
            }}
        >
            <div
                className="card shadow-lg border-0"
                style={{
                    width: "420px",
                    borderRadius: "20px"
                }}
            >
                <div className="card-body p-5">

                    <h1
                        className="text-center fw-bold mb-4"
                        style={{ color: "#0f172a" }}
                    >
                        Welcome Back
                    </h1>

                    <p
                        className="text-center text-muted mb-4"
                    >
                        Login to continue shopping
                    </p>

                    <form onSubmit={login}>

                        <div className="mb-3">
                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100 py-2"
                        >
                            Login
                        </button>

                    </form>

                    <div className="text-center mt-4">

                        <span className="text-muted">
                            New User?
                        </span>

                        <Link
                            to="/register"
                            className="ms-2 text-decoration-none fw-bold"
                        >
                            Create Account
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;