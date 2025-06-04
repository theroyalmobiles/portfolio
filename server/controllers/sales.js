const { Sales } = require("../models");

// Get all sales
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.status(200).json(sales);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving sales", error: err });
    }
};

// Get a specific sale by ID
exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        if (!sale) return res.status(404).json({ message: "Sale not found" });
        res.status(200).json(sale);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving sale", error: err });
    }
};

// Create a new sale
exports.createSale = async (req, res) => {
    try {
        const newSale = new Sales(req.body);
        await newSale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(500).json({ message: "Error creating sale", error: err });
    }
};

// Update a sale
exports.updateSale = async (req, res) => {
    try {
        const updatedSale = await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSale) return res.status(404).json({ message: "Sale not found" });
        res.status(200).json(updatedSale);
    } catch (err) {
        res.status(500).json({ message: "Error updating sale", error: err });
    }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
    try {
        const deletedSale = await Sales.findByIdAndDelete(req.params.id);
        if (!deletedSale) return res.status(404).json({ message: "Sale not found" });
        res.status(200).json({ message: "Sale deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting sale", error: err });
    }
};
