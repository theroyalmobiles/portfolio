const { Accessory } = require("../models");

// Get all accessories
exports.getAllAccessories = async (req, res) => {
    try {
        const accessories = await Accessory.find();
        res.status(200).json(accessories);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving accessories", error: err });
    }
};

// Get a specific accessory
exports.getAccessoryById = async (req, res) => {
    try {
        const accessory = await Accessory.findById(req.params.id);
        if (!accessory) return res.status(404).json({ message: "Accessory not found" });
        res.status(200).json(accessory);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving accessory", error: err });
    }
};

// Create a new accessory
exports.createAccessory = async (req, res) => {
    try {
        const newAccessory = new Accessory(req.body);
        await newAccessory.save();
        res.status(201).json(newAccessory);
    } catch (err) {
        res.status(500).json({ message: "Error creating accessory", error: err });
    }
};

// Update an accessory
exports.updateAccessory = async (req, res) => {
    try {
        const updatedAccessory = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAccessory) return res.status(404).json({ message: "Accessory not found" });
        res.status(200).json(updatedAccessory);
    } catch (err) {
        res.status(500).json({ message: "Error updating accessory", error: err });
    }
};

// Delete an accessory
exports.deleteAccessory = async (req, res) => {
    try {
        const deletedAccessory = await Accessory.findByIdAndDelete(req.params.id);
        if (!deletedAccessory) return res.status(404).json({ message: "Accessory not found" });
        res.status(200).json({ message: "Accessory deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting accessory", error: err });
    }
};
