import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import RPayment from "./RPayment";
import { prt } from '../utils/prt'
import { useNavigate } from "react-router-dom";

const Checkout = ({ amount, subtotal, delivery }) => {
    const navigate=useNavigate()
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
    });

    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({
        subtotal: 0,
        deliveryFee: 0,
        total: 0,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isFormComplete = Object.values(form).every((val) => val.trim() !== "");

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axios.get(`${prt}/payment/car`);
                setCartItems(res.data);
            } catch (err) {
                console.error("Error fetching cart items:", err);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        const subtotal = cartItems.reduce(
            (sum, item) =>
                sum +
                (item.quantity || 1) * (item.product.discountPrice || item.product.price),
            0
        );

        const deliveryFee = subtotal === 0 ? 0 : 2;
        const total = subtotal + deliveryFee;

        setTotals({ subtotal, deliveryFee, total });
    }, [cartItems]);

    // through razorpay
    const handlePayment = async () => {
        try {
            // await RPayment({ amount: totals.total })
            navigate(`/rpay?amount=${amount}`)
        } catch (error) {
            console.error(error)
        }
    }

    // through razorpay
    // ==============================================
    // through stripe
    const handlePaymnt = async () => {
        try {
            const formattedItems = cartItems.map((item) => ({
                name: item.product.name,
                price: item.product.discountPrice || item.product.price,
                quantity: item.quantity,
            }));

            const res = await axios.post(`${prt}/payment/card`, {
                cartItems: formattedItems,
                customerInfo: form,
            });

            if (res.data.success) {
                window.location.href = res.data.session_url;
            } else {
                alert("Stripe session creation failed.");
            }
        } catch (error) {
            console.error("Stripe redirect error:", error);
            alert("Payment failed. Please try again.");
        }
    };

    const stripePromise = loadStripe("Yours_Public_Key"); // Replace with your actual publishable key
    // through stripe

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormComplete) {
            await handlePayment(); // Call handlePayment on submit
        } else {
            alert("Please fill in all fields before proceeding.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left column - Delivery Information */}
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={form.state}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="zip"
                                placeholder="ZIP Code"
                                value={form.zip}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={form.country}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </form>
                </div>

                {/* Right column - Order Summary */}
                <div className="w-full md:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-medium">₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Fee:</span>
                                <span className="font-medium">₹{delivery}</span>
                            </div>
                            <div className="flex justify-between border-t pt-3 mt-3">
                                <span className="text-lg font-bold">Total:</span>
                                <span className="text-lg font-bold">₹{amount}</span>
                            </div>
                        </div>
                        <button
                            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium 
                            hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            onClick={handlePayment}
                            disabled={!isFormComplete}
                        >
                            PROCEED TO PAYMENT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;