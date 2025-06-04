import React from 'react';
import { User } from '../../utils/user';

const AboutH = () => {
    return (
        <section className="w-full py-16 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">About Us</h2>
                <p className="text-lg text-gray-700 text-center leading-relaxed mb-10">
                    We are a leading mobile store in Tiruppur, Tamil Nadu, offering the latest smartphones,
                    accessories, and expert customer support. Our commitment to quality and service makes us
                    the top choice for tech enthusiasts.
                </p>

                {/* Owner Section */}
                <div className="flex flex-col items-center bg-gray-100 border border-gray-300 p-8 rounded-xl shadow-sm max-w-md mx-auto">
                    <img
                        loading="lazy"
                        src={User.profileImage}
                        alt="Owner"
                        className="w-36 h-36 rounded-full object-cover border-4 border-gray-900 mb-4"
                    />
                    <h3 className="text-2xl font-semibold text-gray-900">{User.name}</h3>
                    <p className="text-lg text-gray-600 font-medium">Owner</p>
                </div>
            </div>
        </section>
    );
};

export default AboutH;
