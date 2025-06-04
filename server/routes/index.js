const express = require("express");
const router = express.Router();

const salesRoutes = require("./sales");
const serviceRoutes = require("./service");
const accessoryRoutes = require("./accessory");
const allProductRoutes = require("./allProduct");
const authRoutes = require("./auth");
const paymentRoutes = require("./payment");

router.use("/sales", salesRoutes);
router.use("/services", serviceRoutes);
router.use("/accessories", accessoryRoutes);
router.use("/products", allProductRoutes);
router.use("/auth", authRoutes);
router.use("/rpay", paymentRoutes);

module.exports = router;
