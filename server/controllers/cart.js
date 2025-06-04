const Cart = require('../models/cart');
const Sales = require('../models/sales');
const Service = require('../models/service');
const Accessory = require('../models/accessory');
exports.addToCart = async (req, res) => {
    try {
        const { user_id, product_id, type } = req.body;

        let product;
        if (type === 'sales') {
            product = await Sales.findById(product_id);
        } else if (type === 'services') {
            product = await Service.findById(product_id);
        } else if (type === 'accessories') {
            product = await Accessory.findById(product_id);
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ userId: user_id });

        if (!cart) {
            // If cart doesn't exist, create a new one
            cart = new Cart({
                userId: user_id,
                items: [{ product_id, type, quantity: 1 }]
            });
        } else {
            // If cart exists, check if product is already in the cart
            const existingItemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id.toString() && item.type === type);

            if (existingItemIndex === -1) {
                // If product not in cart, add a new item
                cart.items.push({ product_id, type, quantity: 1 });
            } else {
                // If product already in cart, increase the quantity
                cart.items[existingItemIndex].quantity += 1;
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const { user_id } = req.params;
        const cart = await Cart.findOne({ userId: user_id }).populate('items.product_id');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart.items);  // Returning only the items array
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.removeFromCart =  async (req, res) => {
    const { userId, product_id, type } = req.body
    try {
        const cart = await Cart.findOne({ userId: userId })
        if (!cart) return res.status(404).json({ message: "Cart not found" })

        cart.items = cart.items.filter(i => !(i.product_id.equals(product_id) && i.type === type))
        await cart.save()
        res.json({ message: "Item removed" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateFromCart =  async (req, res) => {
    const { userId, product_id, type, quantity } = req.body
    try {
        const cart = await Cart.findOne({ userId: userId })
        if (!cart) return res.status(404).json({ message: "Cart not found" })

        const item = cart.items.find(i => i.product_id.equals(product_id) && i.type === type)
        if (item) item.quantity = quantity
        await cart.save()
        res.json({ message: "Quantity updated" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}