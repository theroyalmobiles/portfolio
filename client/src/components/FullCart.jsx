import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { prt } from '../utils/prt'
import EmptyCart from "./EmptyCart";
import { showToast } from '../pages/ToastManager';
import axios from 'axios'
import handleImageError from '../utils/imageError';

const FullCart = ({ Items }) => {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState([]);
    const [d, sD] = useState('home');

    const [filteredProducts, setFilteredProducts] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [delivery, setDelivery] = useState(100)
    const [totalAmount, setTotalAmount] = useState(0)

    // cart items get
    useEffect(() => {
        const userId = localStorage.getItem('userId') || 'test123';
        axios
            .get(`${prt}/cart/${userId}`)
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setCartData(response.data);
                } else {
                    console.error('Invalid cart data format');
                }
            })
            .catch(error => {
                console.error('There was an error fetching the cart data!', error);
            });
    }, []);

    // flatten products

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${prt}/api/products`);
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                if (!data.sales || !data.services || !data.accessories) {
                    throw new Error('Invalid product data format');
                }

                const merged = [
                    ...data.sales.map(p => ({ ...p, name: p.product_name, image: p.image_url, category: 'sales' })),
                    ...data.services.map(p => ({ ...p, name: p.product_name, image: p.image_url, category: 'services' })),
                    ...data.accessories.map(p => ({ ...p, name: p.product_name, image: p.image_url, category: 'accessories' }))
                ];


                const allItemsWithQty = cartData.map(c => ({
                    ...c,
                    category: c.type,
                    product_id: c.product_id,
                    qty: c.quantity
                }));

                const result = merged
                    .filter(p => allItemsWithQty.find(i => i.product_id === p._id))
                    .map(p => {
                        const matched = allItemsWithQty.find(i => i.product_id === p._id);
                        return { ...p, qty: matched?.quantity || 1 };
                    });

                setProducts(result);
                setSelected(result.map(p => p._id));
            } catch (error) {
                console.error('There was an error fetching the product data!', error);
            }
        }

        if (cartData.length) fetchData();
    }, [cartData]);

    // filter products
    useEffect(() => {
        if (!selected.length) return;

        const f = filter === 'all' ? products : products.filter(p => p.category.toLowerCase() === filter.toLowerCase())
        setFilteredProducts(f)

        const s = f.filter(p => selected.includes(p._id)).reduce((a, b) => a + b.qty * b.price, 0)
        setSubtotal(s)

        const dl = d === 'home' ? 100 : 0
        setDelivery(dl)

        setTotalAmount(s + dl)
    }, [products, filter, selected, d])
    

    const handleCheckout = (amount) => {
        if (amount === 0) {
            showToast("Please add something to checkout", "error");
        }
        else {
            const finalAmount = amount > 0 ? amount : 10
            const cartItems = filteredProducts.filter(p => selected.includes(p._id))
            navigate('/pay', {
                state: {
                    amount: finalAmount,
                    subtotal,
                    delivery,
                    cartItems
                }
            })
        }
    }        
    // console.log(filteredProducts);



    const updateQty = async (id, amt) => {
        const updated = products.map(i =>
            i._id === id ? { ...i, qty: i.qty + amt < 1 ? 1 : i.qty + amt } : i
        )
        setProducts(updated)

        const updatedItem = updated.find(i => i._id === id)
        try {
            await axios.put(`${prt}/cart/update`, {
                userId: localStorage.getItem('userId'),
                product_id: updatedItem._id,
                quantity: updatedItem.qty,
                type: updatedItem.category
            })
        } catch (err) {
            console.error('Failed to update quantity:', err)
        }
    }
    const removeItem = async id => {
        const updated = products.filter(i => i._id !== id)
        setProducts(updated)
        setSelected(s => s.filter(i => i !== id))

        const removedItem = products.find(i => i._id === id)
        try {
            await axios.delete(`${prt}/cart/remove`, {
                data: {
                    userId: localStorage.getItem('userId'),
                    product_id: removedItem._id,
                    type: removedItem.category
                }
            })
        } catch (err) {
            console.error('Failed to remove item:', err)
        }
    }


    const toggleSelect = id => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    const toggleAll = () => {
        if (selected.length === cartData.length) {
            setSelected([])
        } else {
            setSelected(cartData.map(p => p._id))
        }
    }



    return (
        <div className='flex flex-col md:flex-row gap-6 mt-15 p-6 pt-20 bg-gradient-to-b from-white to-[#f8fafd] min-h-screen'>
            <div className='flex-1 space-y-4 max-w-3xl mx-auto'>
                { }
                <div className='flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar'>
                    {['all', 'Sales', 'Services', 'Accessories'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 cursor-pointer rounded-lg text-sm font-medium transition whitespace-nowrap ${filter === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            {cat === 'all' ? 'All Items' : cat}
                        </button>
                    ))}
                </div>

                { }
                <div className='space-y-3'>
                    { }


                    {filteredProducts.map(p => (
                        <div key={p._id} className="group relative flex items-center gap-3 p-3 mb-3 bg-white rounded-xl border-l-4 border-indigo-500 shadow-md hover:shadow-lg transition-all">
                            {/* Selection area with custom checkbox */}
                            <div className="flex-shrink-0">
                                <label className="block w-6 h-6 relative cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(p._id)}
                                        onChange={() => toggleSelect(p._id)}
                                        className="peer sr-only"
                                    />
                                    <span className="absolute inset-0 rounded-md border-2 border-gray-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-colors"></span>
                                    <svg className="absolute inset-0 w-6 h-6 text-white scale-0 peer-checked:scale-100 transition-transform" viewBox="0 0 24 24" fill="none">
                                        <path d="M7 13L10 16L17 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </label>
                            </div>

                            {/* Product image with animated border */}
                            <div className="relative flex-shrink-0">
                                <div className="w-14 h-14 rounded-lg bg-indigo-50 p-0.5 overflow-hidden ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all">
                                    <img
                                        src={p.image_url || "/imgs/default-img.png"}
                                        alt={p.name}
                                        className="w-full h-full object-cover rounded"
                                        onError={handleImageError}
                                    />
                                </div>
                            </div>

                            {/* Product details with better layout */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline">
                                    <h3 className="text-sm font-bold text-gray-900 truncate">{p.name}</h3>
                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">{p.category}</span>
                                </div>

                                {/* Price display */}
                                <div className="mt-1 text-base font-bold text-indigo-600">
                                    ₹{(p.price * p.qty).toLocaleString('en-IN')}
                                </div>
                            </div>

                            {/* Stylish quantity control */}
                            <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                                <button
                                    onClick={() => updateQty(p._id, -1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-700 transition-colors"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center text-sm font-medium">
                                    {p.qty}
                                </span>
                                <button
                                    onClick={() => updateQty(p._id, 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-700 transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            {/* Remove button with animation */}
                            <button
                                onClick={() => removeItem(p._id)}
                                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                                aria-label="Remove item"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className='text-center bg-gray-50 rounded-lg'>
                        <EmptyCart path={filter.toLowerCase() !== "all" ? filter.toLowerCase() : ""} />
                        { }
                    </div>
                )}
            </div>

            <div className='w-full md:w-1/4 p-5 rounded-2xl shadow-lg bg-gradient-to-br from-white to-blue-50 border border-blue-100 space-y-4 sticky top-4'>
                {/* Header with icon */}
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 17L3 11L5 9L9 13L19 3L21 5L9 17Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2 className='text-xl font-bold text-gray-800'>Order Summary</h2>
                </div>

                {/* Delivery Options */}
                <div className='space-y-2'>
                    <p className='text-xs font-medium text-blue-600 uppercase tracking-wider'>Delivery Options</p>
                    <div className='flex gap-3 overflow-x-auto'>
                        <button
                            onClick={() => sD('home')}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 flex items-center gap-1 ${d === 'home'
                                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                        >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 22V12H15V22" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Home Delivery
                        </button>

                        <button
                            onClick={() => sD('collect')}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 flex items-center gap-1 ${d === 'collect'
                                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                        >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 19V8.00004C4 7.20439 4.31607 6.44132 4.87868 5.87871C5.44129 5.3161 6.20435 5.00004 7 5.00004H20.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.344 3L21 5L17.344 7" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 13H17" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="8" cy="19" r="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="17" cy="19" r="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Click & Collect
                        </button>
                    </div>
                </div>

                {/* Order details */}
                <div className='mt-4 pt-4 space-y-3 border-t border-blue-100'>
                    <div className='flex justify-between items-center text-sm text-gray-600'>
                        <span>Subtotal</span>
                        <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className='flex justify-between items-center text-sm text-gray-600'>
                        <div className="flex items-center gap-1">
                            <span>Delivery</span>
                            {d === 'home' && (
                                <div className="group relative">
                                    <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                        <path d="M12 16V12M12 8H12.01" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        Home delivery fee based on your location
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className={`font-medium ${d === 'collect' ? 'text-green-600' : ''}`}>
                            {d === 'collect' ? 'FREE' : `₹${delivery.toLocaleString('en-IN')}`}
                        </span>
                    </div>

                    {/* Total with highlight */}
                    <div className='flex justify-between items-center text-base font-bold pt-3 border-t border-blue-100'>
                        <span className="text-gray-800">Total</span>
                        <span className="text-blue-700">₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {/* Checkout button */}
                <button
                    className='w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer'
                    onClick={() => handleCheckout(totalAmount)}
                >
                    <span>Checkout</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Security note */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mt-2">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Secure checkout</span>
                </div>
            </div>
        </div>
    )
}

export default FullCart;
