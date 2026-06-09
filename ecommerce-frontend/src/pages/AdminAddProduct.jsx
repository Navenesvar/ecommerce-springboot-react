import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminAddProduct() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/products",
                formData,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token")
                    }
                }
            );

            alert("Product Added Successfully");

            setFormData({
                name: "",
                description: "",
                price: "",
                imageUrl: ""
            });

        } catch (error) {

            console.log(error);

            alert("Failed to add product");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h1>Add Product</h1>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Description</label>

                        <textarea
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Price</label>

                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Image URL</label>

                        <input
                            type="text"
                            name="imageUrl"
                            className="form-control"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Add Product
                    </button>

                </form>

            </div>
        </>
    );
}

export default AdminAddProduct;