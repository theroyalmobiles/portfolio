import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroH = () => {
    const navigate = useNavigate();
    return (
        <section className="w-full h-[85vh] md:h-[90vh] relative z-10">
            <div
                className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url('/images/home-bg.png')` }}
            >
                {/* Dark Overlay */}
                <div className="w-full h-full bg-black/60 flex items-center px-6 lg:px-16">
                    <div className="flex flex-col lg:flex-row items-center w-full justify-between">
                        {/* Left Side - Text Content */}
                        <div className="text-white w-full lg:w-1/2 text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                                Your One-Stop Mobile Destination in Tiruppur!
                            </h2>
                            <p className="text-gray-300 text-lg mt-4">
                                Discover the latest smartphones, accessories, and expert repair services.
                            </p>
                            <button
                                className="mt-6 px-6 py-3 text-lg text-white bg-blue-600 rounded-full transition-all duration-300 hover:bg-blue-700 shadow-lg"
                                onClick={() => navigate('/products')}
                            >
                                Explore Now
                            </button>
                        </div>

                        {/* Right Side - Image */}
                        <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                            <img
                                loading="lazy"
                                src="/images/hero-right.png"
                                className="w-10/12 max-w-[500px] rounded-2xl shadow-2xl"
                                alt="Smartphones showcase"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroH;
