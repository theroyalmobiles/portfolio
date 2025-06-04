import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF } from 'react-icons/fa';
import { User } from '../../utils/user';

const ContactH = () => {
    return (
        <section className="w-full py-16">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-black text-center mb-10 uppercase">
                    Get in Touch
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col justify-center items-center">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>

                        <div className="space-y-6 w-full">
                            <div className="flex items-center space-x-4">
                                <FaPhoneAlt className="text-blue-600 text-xl" />
                                <Link to={`tel:${User.phone.replaceAll(' ', '')}`} className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">
                                    {User.phone}
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FaEnvelope className="text-blue-600 text-xl" />
                                <Link to={`mailto:${User.mail}`} className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">
                                    {User.mail}
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                                <Link to={User.mapUrl} className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">
                                    {User.address}, {User.pincode}
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FaFacebookF className="text-blue-600 text-xl" />
                                <Link to={User.fb} className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">
                                    {User.fb.replace('https://www.facebook.com/', '')}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="relative overflow-hidden rounded-xl shadow-xl">
                        <iframe
                            className="w-full h-96 md:h-full rounded-xl"
                            title="Location Map"
                            src={User.embedMap}
                        />
                        <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactH;
