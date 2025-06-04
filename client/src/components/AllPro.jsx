import React from 'react';
import { useNavigate } from 'react-router-dom';

const AllPro = () => {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-30"></div>
            <div className="absolute top-1/3 right-20 w-24 h-24 bg-cyan-100 rounded-full opacity-40"></div>

            {/* Header */}
            <div className="text-center mb-12 mt-32">
                <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Products & Services</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Discover our complete range of products and services designed to meet your every need. Click on any category below to explore more.</p>
            </div>

            {/* Main buttons container - with mt-36 (150px equivalent) */}
            <div className="flex flex-wrap justify-center gap-8 py-8 mt-20 z-10 w-full max-w-4xl">
                {/* Sales Button */}
                <button
                    onClick={() => handleNavigation('/sales')}
                    className="cursor-pointer relative overflow-hidden p-6 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center w-64"
                >
                    <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="#FF8C00" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold mb-2">Sales</span>
                    <span className="text-sm opacity-80">Browse our products catalog</span>
                    <span className="absolute inset-0 bg-white opacity-20 transform translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                </button>

                {/* Services Button */}
                <button
                    onClick={() => handleNavigation('/services')}
                    className="cursor-pointer relative overflow-hidden p-6 rounded-xl font-medium text-white bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center w-64"
                >
                    <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="#FF8C00" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold mb-2">Services</span>
                    <span className="text-sm opacity-80">Explore our service offerings</span>
                    <span className="absolute inset-0 bg-blue-200 opacity-10 transform -translate-x-full transition-transform duration-500 ease-out hover:translate-x-0"></span>
                </button>

                {/* Accessories Button */}
                <button
                    onClick={() => handleNavigation('/accessories')}
                    className="cursor-pointer relative overflow-hidden p-6 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center w-64"
                >
                    <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="#FF8C00" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold mb-2">Accessories</span>
                    <span className="text-sm opacity-80">Find the perfect add-ons</span>
                    <div className="absolute inset-0 opacity-0 hover:opacity-20 bg-blue-100 transition-opacity duration-300">
                        <div className="absolute inset-0 animate-pulse"></div>
                    </div>
                </button>
            </div>

            {/* Bottom decorative wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.99,88.01,194.36,60.11,321.39,56.44Z" className="fill-blue-100 opacity-50"></path>
                </svg>
            </div>
        </div>
    );
};

export default AllPro;