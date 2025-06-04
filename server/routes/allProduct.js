const express = require("express")
const router = express.Router()
const { Sales, Service, Accessory } = require("../models")

router.get("/", async (req, res) => {
    try {
        const sales = await Sales.find()
        const services = await Service.find()
        const accessories = await Accessory.find()
        res.status(200).json({
            sales,
            services,
            accessories
        })
    } catch (err) {
        res.status(500).json({ message: "Error retrieving products", error: err })
    }
})

module.exports = router
