import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/jwt";

function ProductCard({ product, onDelete }) {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = getRoleFromToken();

    console.log("ROLE =", role);

    const addToCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please login first");

            navigate("/login");

            return;
        }

        try {

            await api.post(
                "/cart",
                {
                    productId: product.id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Added To Cart");

        } catch (error) {

            console.log(error);

            alert("Failed To Add Product");
        }
    };

    const handleDelete = () => {

        if (
            window.confirm(
                "Are you sure you want to delete this product?"
            )
        ) {

            onDelete(product.id);
        }
    };

    return (

        <div className="card border-0 shadow-lg h-100">

            <img
                src={
                    product.imageUrl ||
                    "https://via.placeholder.com/300"
                }
                className="card-img-top"
                alt={product.name}
                style={{
                    height: "220px",
                    objectFit: "cover"
                }}
            />

            <div className="card-body">

                <h4 className="fw-bold">
                    {product.name}
                </h4>

                <p className="text-muted">
                    {product.description}
                </p>

                <h3 className="text-success">
                    ₹{product.price}
                </h3>

            </div>

            <div className="card-footer bg-white border-0">

                <button
                    className="btn btn-primary w-100"
                    onClick={addToCart}
                >
                    Add To Cart
                </button>

                {role === "ADMIN" && (
                    <>
                        <Link
                            to={`/admin/edit-product/${product.id}`}
                            className="btn btn-warning w-100 mt-2"
                        >
                            Edit Product
                        </Link>

                        {onDelete && (
                            <button
                                className="btn btn-danger w-100 mt-2"
                                onClick={handleDelete}
                            >
                                Delete Product
                            </button>
                        )}
                    </>
                )}

            </div>

        </div>
    );
}

export default ProductCard;