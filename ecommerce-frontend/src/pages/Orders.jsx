import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

    console.log(
        "Token:",
        localStorage.getItem("token")
    );

    try {

        const response = await api.get(
            "/orders/my-orders",
            {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            }
        );

        setOrders(response.data);

    } catch(error) {

        console.log(error);
    }
};

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h1 className="mb-4">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="alert alert-info">
                        No Orders Found
                    </div>
                ) : (
                    orders.map(order => (

                        <div
                            key={order.id}
                            className="card shadow-sm mb-3"
                        >
                            <div className="card-body">

                                <h4>
                                    {order.product?.name}
                                </h4>

                                <p>
                                    ₹{order.product?.price}
                                </p>

                                <p>
                                    Quantity :
                                    {" "}
                                    {order.quantity}
                                </p>

                                <h5>
                                    Total : ₹
                                    {
                                        order.quantity *
                                        (order.product?.price || 0)
                                    }
                                </h5>

                            </div>
                        </div>

                    ))
                )}

            </div>
        </>
    );
}

export default Orders;