const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
router.post('/add', cartController.addToCart);
router.get('/:user_id', cartController.getUserCart);
router.delete('/remove', cartController.removeFromCart)
router.put('/update', cartController.updateFromCart)
module.exports = router;
