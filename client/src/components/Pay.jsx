import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CheckoutPage from '../pages/CheckoutPage';

const Pay = () => {
    const location = useLocation();
    const { amount = 10, subtotal = 0, delivery = 0, cartItems=[] } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState(null);


    const qrCodeUrl = `https://gpayqr.vercel.app/?amount=${amount}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
            {paymentMethod === 'card' ? (
                // Card payment mode - render Checkout directly without the blue header
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden p-6"
                >
                   

                    <CheckoutPage amount={amount} products={cartItems}/>

                </motion.div>
            ) : (
                // Payment method selection or QR code mode
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                >
                    <div className="p-6 bg-indigo-600 text-white text-center">
                        <h2 className="text-2xl font-bold">Payment</h2>
                        <p className="text-indigo-100">Amount: ₹{Number(amount).toLocaleString("en-IN")}</p>
                    </div>

                    {!paymentMethod ? (
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-center mb-6 text-gray-700">Choose Payment Method</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPaymentMethod('card')}
                                    className="p-4 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span className="font-medium text-gray-800">Card</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setPaymentMethod('qr')}
                                    className="p-4 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    <span className="font-medium text-gray-800">QR Code</span>
                                </motion.button>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-6 flex flex-col items-center"
                        >
                            <div className="flex items-center mb-6 self-start">
                                <button
                                    onClick={() => setPaymentMethod(null)}
                                    className="mr-2 text-indigo-600 hover:text-indigo-800"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <h3 className="text-lg font-medium text-gray-700">QR Code Payment</h3>
                            </div>

                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="bg-white p-4 rounded-lg shadow-md"
                            >
                                <img
                                    src={qrCodeUrl}
                                    alt="Payment QR Code"
                                    className="w-64 h-64"
                                />
                            </motion.div>

                            <p className="mt-6 text-gray-600 text-center">
                                Scan the QR code with your payment app to pay ₹{Number(amount).toLocaleString("en-IN")}
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Pay;