import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {

        try {

            const response = await api.get(
                "/cart",
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token")
                    }
                }
            );

            console.log("Cart Data:", response.data);

            setCartItems(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const removeItem = async (id) => {

        try {

            await api.delete(
                `/cart/${id}`,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token")
                    }
                }
            );

            setCartItems(items =>
                items.filter(item => item.id !== id)
            );

        } catch (error) {

            console.log(error);
        }
    };

    const increaseQty = (id) => {

        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {

        setCartItems(items =>
            items.map(item =>
                item.id === id && item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            )
        );
    };

    const placeOrder = async () => {

        try {

            await api.post(
                "/orders/place",
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token")
                    }
                }
            );

            alert("Order Placed Successfully");

            navigate("/orders");

        } catch (error) {

            console.log(error);

            alert("Failed to place order");
        }
    };

    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            ((item.product?.price || 0) * item.quantity),
        0
    );

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h1 className="mb-4">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="alert alert-info">
                        Cart is empty
                    </div>
                ) : (
                    cartItems.map(item => (

                        <div
                            key={item.id}
                            className="card shadow-sm mb-3"
                        >
                            <div className="card-body">

                                <h4>
                                    {item.product?.name || "Product"}
                                </h4>

                                <p>
                                    ₹{item.product?.price || 0}
                                </p>

                                <div className="d-flex align-items-center gap-3">

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            decreaseQty(item.id)
                                        }
                                    >
                                        -
                                    </button>

                                    <h5 className="mb-0">
                                        {item.quantity}
                                    </h5>

                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            increaseQty(item.id)
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <h5 className="mt-3">

                                    Subtotal : ₹
                                    {
                                        (item.product?.price || 0)
                                        *
                                        item.quantity
                                    }

                                </h5>

                                <button
                                    className="btn btn-outline-danger mt-2"
                                    onClick={() =>
                                        removeItem(item.id)
                                    }
                                >
                                    Remove Item
                                </button>

                            </div>
                        </div>

                    ))
                )}

                <div className="card shadow p-4">

                    <h3>
                        Total : ₹{total}
                    </h3>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>

                </div>

            </div>
        </>
    );
}

export default Cart;