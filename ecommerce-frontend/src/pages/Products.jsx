import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadProducts();

    }, []);
    const deleteProduct = async (id) => {
    try {
        await api.delete(
            `/products/${id}`,
            {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            }
        );

        setProducts(products =>
            products.filter(product => product.id !== id)
        );

    } catch (error) {
        console.log(error);
    }
};

    const loadProducts = async () => {

        try {

            const response =
                await api.get("/products");

            setProducts(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const filteredProducts =
        products.filter(product =>
            product.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h1
                    className="text-center fw-bold mb-4">

                    Featured Products

                </h1>

                <div className="row mb-4">

                    <div className="col-md-6 mx-auto">

                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>

                <div className="row">

                    {filteredProducts.map(product => (

                        <div
                            key={product.id}
                            className="col-md-4 mb-4">

                            <ProductCard
                                product={product}
                                onDelete={deleteProduct}
                            />

                        </div>

                    ))}

                </div>

            </div>
        </>
    );
}

export default Products;