const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
    accessory_id: { type: String, required: true },
    product_name: { type: String, required: true },
    type: { type: String, default:"accessories" },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    compatibility: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
});

const Accessory = mongoose.model("Accessory", AccessorySchema);
module.exports = Accessory;
