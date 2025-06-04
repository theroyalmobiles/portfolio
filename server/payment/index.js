const express = require('express')
const QRCode = require('qrcode')
const router = express.Router()
const Stripe = require("stripe");
require('dotenv').config()
const url = process.env.MAIN_URL ||"http://localhost:5173/";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use env variable

router.get('/', async (req, res) => {
    const amount = req.query.amount
    const upiID = req.query.upiID || 'giridharans1729-1@okaxis'
    const name = req.query.name || 'Giridharan S'

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        return res.status(400).send('Invalid amount')
    }

    const upiUrl = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`

    try {
        const qrImageBuffer = await QRCode.toBuffer(upiUrl, { type: 'png' })
        res.set('Content-Type', 'image/png')
        res.send(qrImageBuffer)
    } catch {
        res.status(500).send('Failed to generate QR')
    }
})

router.post("/card", async (req, res) => {
    const { cartItems, customerInfo } = req.body;

    try {
        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // convert to paise
            },
            quantity: item.quantity || 1,
        }));

        // Optional: Add delivery fee
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge",
                },
                unit_amount: 0, // ₹2 delivery charge in paise
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            customer_email: customerInfo.email,
            success_url: `${url}verify?success=true`, // Update as per your frontend route
            cancel_url: `${url}verify?success=false`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router


