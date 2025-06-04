import React, { useState, useEffect } from "react";
import handleImageError from '../utils/imageError';
import PrintBillButton from './PrintBillButton'

const RAZORPAY_KEY_ID = "rzp_test_glNCOpCuIgvwcY";

const CheckoutPage = ({ amount = 0, products = [] }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        deliveryAddress: "",
    });
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const steps = [
        { id: 0, text: "Processing Payment", completed: false },
        { id: 1, text: "Payment Successful", completed: false },
        { id: 2, text: "Order Confirmed", completed: false },
        { id: 3, text: "Delivery in 1–2 Days", completed: false },
    ];
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
 
    // Fixed handler for phone number input
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            handleChange(e);
            return;
        }
        if (!/^\d*$/.test(value)) {
            return;
        }
        if (value.length > 0 && !['6', '7', '8', '9'].includes(value[0])) {
            return; 
        }
        if (value.length <= 10) {
            handleChange(e);
        }
    };


    // console.log("products", products);

    // Check if we need to split products into two columns
    const shouldSplitColumns = products.length > 3;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.phoneNumber || !formData.deliveryAddress) {
            alert("Please fill in all fields");
            return;
        }
        setIsPaymentProcessing(true);
        openRazorpayCheckout();
    };

    const openRazorpayCheckout = () => {
        const options = {
            key: RAZORPAY_KEY_ID,
            amount: amount * 100,
            currency: "INR",
            name: "The Royal Mobiles",
            description: "Purchase",
            handler: function (response) {
                handlePaymentSuccess(response);
            },
            prefill: {
                name: formData.fullName,
                contact: formData.phoneNumber,
            },
            notes: {
                address: formData.deliveryAddress,
            },
            theme: {
                color: "#4f39f6",
            },
            modal: {
                ondismiss: function () {
                    setIsPaymentProcessing(false);
                },
            },
        };
        try {
            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error("Razorpay error:", error);
            setIsPaymentProcessing(false);
        }
    };

    const handlePaymentSuccess = () => {
        setPaymentSuccess(true);
        startStepAnimation();
    };

    const startStepAnimation = () => {
        let stepCounter = 0;
        const interval = setInterval(() => {
            if (stepCounter < steps.length) {
                setCurrentStep(stepCounter);
                stepCounter++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    };

    const renderProducts = () => {
        return (
            <div className={`space-y-4 ${products.length > 3 ? "max-h-[370px] overflow-y-auto pr-2" : ""}`}>
                {products.map((product) => (
                    <div key={product.id} className="flex items-center p-4 border border-gray-200 rounded-lg bg-white">
                        <div className="flex-shrink-0">
                            <img
                                src={product.image_url || "/imgs/default-img.png"}
                                alt={product.name}
                                onError={handleImageError}
                                className="w-20 h-20 object-cover rounded-md bg-gray-200"
                            />
                        </div>
                        <div className="ml-4 flex-grow">
                            <h3 className="font-medium text-gray-800">{product.name}</h3>
                            <p className="text-purple-600 font-semibold">₹{product.price}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Quantity</p>
                            <div className="bg-gray-200 px-3 py-1 rounded w-12 text-center">
                                <p className="font-medium">{product.qty}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-10xl mx-auto">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mb-8 text-center">Checkout</h1>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Products Section (Left) */}
                        <div className="md:w-1/2 p-6 bg-gray-50 border-r border-gray-200" id="sumary">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

                            {renderProducts()}

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                                    <span className="text-xl font-bold text-purple-600">₹{amount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Section (Right) */}
                        <div className="md:w-1/2 p-6">
                            {!paymentSuccess ? (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Details</h2>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handlePhoneChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                pattern="[6-9][0-9]{9}"
                                                maxLength={10}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">
                                                Delivery Address
                                            </label>
                                            <textarea
                                                id="deliveryAddress"
                                                name="deliveryAddress"
                                                rows="4"
                                                value={formData.deliveryAddress}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isPaymentProcessing}
                                                className={`w-full py-4 px-4 rounded-lg shadow-sm text-white font-medium text-lg transition-colors duration-200 ${isPaymentProcessing
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                    }`}
                                            >
                                                {isPaymentProcessing ? "Processing..." : "Pay Now"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
                                    <p className="mt-2 text-gray-600">Your order has been placed successfully.</p>
                                </div>
                            )}
                        </div>

                    </div>

                    {paymentSuccess && <PrintBillButton />}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;