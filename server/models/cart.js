const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
            type: { type: String, enum: ['sales', 'services', 'accessories'], required: true },
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
