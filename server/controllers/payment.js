const Razorpay = require("razorpay")
const crypto = require("crypto")

const createOrder = async (req, res) => {
    try {
        if (!req.body.amount) return res.status(400).json({ message: "Amount is required" })

        const instance = new Razorpay({
            key_id: "rzp_test_glNCOpCuIgvwcY",
            key_secret: "DVeY0aj5zs59uDw5aqPFwH4x"
        })

        const options = {
            amount: req.body.amount ,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }

        const order = await instance.orders.create(options)
        res.status(200).json(order)

    } catch (err) {
        console.error("Razorpay error:", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const verifyPayment = (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", "DVeY0aj5zs59uDw5aqPFwH4x")
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}
const getApi = (req, res) => {
    res.status(200).send("success");
}

module.exports = { createOrder, verifyPayment,getApi }
