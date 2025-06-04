import React from 'react';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaTools, FaHeadphones } from 'react-icons/fa';

const ServicesH = () => {
    return (
        <section className="bg-gray-100 w-full mt-12 py-16 px-4">
            <div className="flex flex-col items-center w-full">
                <h1 className="text-3xl font-bold text-black text-center">Our Services</h1>
                <div className="flex flex-wrap justify-center gap-8 mt-14 px-4">
                    <div className="bg-white shadow-md rounded-xl p-10 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-100">
                        <Link to="/sales" className="flex flex-col items-center">
                            <FaMobileAlt className="text-blue-500 text-3xl mb-4 transition-transform duration-300 hover:scale-110 hover:text-blue-800" />
                            <h3 className="text-lg font-bold text-black">Mobile Sales</h3>
                            <p className="text-gray-600 mt-2">Latest smartphones from all major brands</p>
                        </Link>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-10 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-100">
                        <Link to="/services" className="flex flex-col items-center">
                            <FaTools className="text-blue-500 text-3xl mb-4 transition-transform duration-300 hover:scale-110 hover:text-blue-800" />
                            <h3 className="text-lg font-bold text-black">Repair Services</h3>
                            <p className="text-gray-600 mt-2">Professional repair and maintenance</p>
                        </Link>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-10 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-100">
                        <Link to="/accessories" className="flex flex-col items-center">
                            <FaHeadphones className="text-blue-500 text-3xl mb-4 transition-transform duration-300 hover:scale-110 hover:text-blue-800" />
                            <h3 className="text-lg font-bold text-black">Accessories</h3>
                            <p className="text-gray-600 mt-2">Wide range of mobile accessories</p>
                        </Link>
                    </div>
                </div>
                <Link
                    to="/services"
                    className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full mt-6 hover:bg-blue-700 transition-colors"
                >
                    Get a Repair
                </Link>
            </div>
        </section>
    );
};

export default ServicesH;
