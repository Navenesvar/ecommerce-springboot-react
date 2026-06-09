import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const register = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/users/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            alert("Registration Failed");
            console.log(error);
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
                    width: "450px",
                    borderRadius: "20px"
                }}
            >
                <div className="card-body p-5">

                    <h1
                        className="text-center fw-bold mb-3"
                        style={{ color: "#0f172a" }}
                    >
                        Create Account
                    </h1>

                    <p
                        className="text-center text-muted mb-4"
                    >
                        Join our E-Commerce Store
                    </p>

                    <form onSubmit={register}>

                        <div className="mb-3">

                            <label className="form-label">
                                Full Name
                            </label>

                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Enter your email"
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
                                placeholder="Create password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 py-2"
                        >
                            Create Account
                        </button>

                    </form>

                    <div className="text-center mt-4">

                        <span className="text-muted">
                            Already have an account?
                        </span>

                        <Link
                            to="/login"
                            className="ms-2 text-decoration-none fw-bold"
                        >
                            Login
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Register;