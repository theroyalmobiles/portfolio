const express = require("express")
const router = express.Router()
const { createOrder, verifyPayment, getApi } = require("../controllers/payment")

router.post("/create-order", createOrder)
router.post("/verify-payment", verifyPayment)
router.get("/", getApi)

module.exports = router

