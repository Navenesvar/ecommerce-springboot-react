import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminDashboard() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h1>Admin Dashboard</h1>

                <div className="mt-4">

                    <button
                        className="btn btn-primary me-3"
                        onClick={() => navigate("/admin/add-product")}
                    >
                        Add Product
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/products")}
                    >
                        View Products
                    </button>

                </div>

            </div>
        </>
    );
}

export default AdminDashboard;