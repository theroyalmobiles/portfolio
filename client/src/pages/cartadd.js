import { showToast } from './ToastManager';
import {prt} from '../utils/prt'

const addToCart = async (id = 'i', cname = "n", product_name = "p") => {
    const userId = localStorage.getItem("userId") || "test123";
    try {
        const response = await fetch(`${prt}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                product_id: id,
                type: cname,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Show a success toast with the product name
            showToast(`${product_name} added to cart`);
        } else {
            // Show an error toast if something went wrong
            showToast(data.message || 'Failed to add to cart');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Error adding to cart');
    }
};

export default addToCart;
