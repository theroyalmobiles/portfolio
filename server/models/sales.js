const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
    sales_id: { type: String, required: true },
    product_name: { type: String, required: true },
    type: { type: String, default:"sales" },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
});

const Sales = mongoose.model("Sales", SalesSchema);
module.exports = Sales;
