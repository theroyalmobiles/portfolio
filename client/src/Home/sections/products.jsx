import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductsH = () => {
    return (
        <section className="w-full px-4 md:px-10 z-10">
            <div className="w-full">
                <h2 className="text-black text-2xl font-bold text-center mt-12">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10 p-4">
                    {[
                        { src: "/images/phones/p1.png", title: "iPhone 15 Pro Max", price: "₹159,900" },
                        { src: "/images/phones/p2.png", title: "Samsung S24 Ultra", price: "₹129,999" },
                        { src: "/images/phones/p3.png", title: "OnePlus 12", price: "₹64,999" },
                        { src: "/images/phones/p4.png", title: "Google Pixel 8 Pro", price: "₹89,999" }
                    ].map((product, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-xl bg-white shadow-lg overflow-hidden cursor-pointer"
                        >
                            <img
                                loading="lazy"
                                src={product.src}
                                className="w-full aspect-[1.53] object-contain"
                                alt={product.title}
                            />
                            <div className="p-5">
                                <h3 className="text-black text-lg font-bold">{product.title}</h3>
                                <p className="text-blue-600 font-bold mt-2">{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <Link to="/sales" className="block mx-auto mt-6 bg-blue-600 text-white font-bold px-6 py-3 rounded-full text-center w-fit">
                    View All Products
                </Link>
            </div>
        </section>
    );
};

export default ProductsH;
