import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCart = ({path=""}) => {
    return (
        <div className="flex flex-col items-center justify-center h-[90vh] p-8 bg-white rounded-lg shadow-sm">
            <div className="animate-bounce mb-6">
                <div className="relative">
                    <ShoppingCart size={64} className="text-blue-500" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-100 rounded-full animate-ping" />
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2 animate-fade-in">
                Your cart is empty
            </h2>

            <p className="text-gray-500 text-center mb-6 max-w-sm animate-fade-in">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>

            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg 
                       transform transition-all duration-200 
                       hover:bg-blue-600 hover:scale-105 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                       shadow-md hover:shadow-lg">
                <Link to={`/${path}`}>
                    Start Shopping
                </Link>
            </button>
        </div>
    );
};

export default EmptyCart;