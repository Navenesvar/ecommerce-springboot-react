import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminEditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: ""
    });

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {

        try {

            const response =
                await api.get(`/products/${id}`);

            setProduct(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const updateProduct = async (e) => {

        e.preventDefault();

        try {

            await api.put(
                `/products/${id}`,
                product,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token")
                    }
                }
            );

            alert("Product Updated");

            navigate("/products");

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2>Edit Product</h2>

                <form onSubmit={updateProduct}>

                    <input
                        type="text"
                        name="name"
                        className="form-control mb-3"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                    />

                    <input
                        type="text"
                        name="description"
                        className="form-control mb-3"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />

                    <input
                        type="number"
                        name="price"
                        className="form-control mb-3"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Price"
                    />

                    <input
                        type="text"
                        name="imageUrl"
                        className="form-control mb-3"
                        value={product.imageUrl}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />

                    <button
                        className="btn btn-success"
                    >
                        Update Product
                    </button>

                </form>

            </div>
        </>
    );
}

export default AdminEditProduct;