const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    services_id: { type: String, required: true },
    product_name: { type: String, required: true },
    type: { type: String, default:"services" },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    last_updated: { type: Date },
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
