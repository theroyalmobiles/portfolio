import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { prt, iurl } from '../utils/prt';
import { Loader2, ArrowLeft, ShoppingCart, CreditCard, Star } from "lucide-react";
import addToCart from "../pages/cartadd";

const Details = () => {
    const { name, id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const handleImageError = (event) => {
        if (!event.target.dataset.error) {
            event.target.dataset.error = "true";
            event.target.src = "/imgs/default-img.png";
        }
    };

    const fetchData = async (endpoint) => {
        try {
            setLoading(true);
            const res = await axios.get(`${prt}/api/${endpoint}/${id}`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const endpoints = {
            sales: fetchData.bind(null, "sales"),
            services: fetchData.bind(null, "services"),
            accessories: fetchData.bind(null, "accessories"),
        };

        endpoints[name]?.();
    }, [name, id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <Loader2 className="w-12 h-12 animate-spin text-green-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black pt-[100px]">
            <Link
                to={`/${name}`}
                className="fixed top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors duration-300 z-10"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to results</span>
            </Link>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-900 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        <img
                            src={data.image_url}
                            alt={data.product_name}
                            className="w-full h-[500px] object-contain rounded-lg bg-black p-4"
                            onError={handleImageError}
                        />
                        <div className="absolute top-4 right-4 bg-black/80 px-4 py-2 rounded-full">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-white">4.5</span>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-white border-l-4 border-green-500 pl-4">
                            {data.product_name}
                        </h1>

                        <div className="bg-black p-6 rounded-lg border border-gray-800">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                                    <span className="text-gray-400">Brand</span>
                                    <span className="text-green-500 font-semibold">{data.brand}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                                    <span className="text-gray-400">Model</span>
                                    <span className="text-white">{data.model || data.category || data.compatibility}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Price</span>
                                    <span className="text-3xl font-bold text-green-500">₹{data.price}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black text-white p-6 rounded-lg border border-gray-800">
                            <h3 className="text-xl font-semibold mb-4 text-green-500">About this item</h3>
                            <p className="text-gray-300 leading-relaxed">{data.description}</p>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                <Link to={`/pay`} state={{ amount: data.price }}>
                                    Buy Now
                                </Link>
                            </button>
                            <button onClick={()=>{addToCart(data._id,name,data.product_name)}} className="flex-1 bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500/10 font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Details;