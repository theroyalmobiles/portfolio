import React, { useState } from "react"
import axios from "axios"
import {prt} from "../utils/prt"
import { useLocation } from "react-router-dom"

const RPayment = () => {
    const { search } = useLocation()
    const ramount = new URLSearchParams(search).get("amount")
    
    const [loading, setLoading] = useState(false)

    const handlePay = async () => {
        try {
            console.log("rpay starting")
            // setLoading(true)
            const res = await axios.post(`${prt}/api/rpay/create-order`, { amount: ramount })
            const { id, amount, currency } = res.data

            const options = {
                key: "rzp_test_glNCOpCuIgvwcY",
                amount,
                currency,
                order_id: id,
                handler: async (response) => {
                    await axios.post(`${prt}/verify-payment`, response)
                    alert("Payment Successful")
                },
                prefill: { name: "Giridharan", email: "giridharans129@gmail.com" },
                theme: { color: "#3B82F6" }
            }
            
            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (err) {
            console.log("Payment Failed",err)
        } finally {
            // setLoading(false)
            console.log("rpay ending")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <div className="bg-white p-8 rounded-xl shadow-lg w-80 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Payment</h2>
                <div className="bg-blue-50 p-4 rounded-lg w-full mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount:</span>
                        <span className="text-xl font-bold text-gray-800">{ramount || 100}</span>
                    </div>
                </div>
                <button onClick={handlePay} disabled={loading} className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow transition-colors flex items-center justify-center">
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        <span className="flex items-center">
                            Pay ₹{ramount} Now
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    )}
                </button>
                <div className="mt-4 text-sm text-gray-500 text-center">Secured by Razorpay Payment Gateway</div>
            </div>
        </div>
    )
}

export default RPayment
