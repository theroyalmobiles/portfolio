const express = require("express");
const {
    getAllAccessories,
    getAccessoryById,
    createAccessory,
    updateAccessory,
    deleteAccessory,
} = require("../controllers/accessory");

const router = express.Router();

router.get("/", getAllAccessories);
router.get("/:id", getAccessoryById);
router.post("/", createAccessory);
router.put("/:id", updateAccessory);
router.delete("/:id", deleteAccessory);

module.exports = router;
