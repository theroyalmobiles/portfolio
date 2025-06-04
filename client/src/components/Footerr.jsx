import React from "react";
import { User } from "../utils/user";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bottom-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 shadow-md mt-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-5 space-y-4 md:space-y-0">
                {/* Copyright Section */}
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-lg">©</span>
                    <span className="font-medium">2025</span>
                    <Link
                        to={User.weburl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
                    >
                        {User.name}
                    </Link>
                </div>

                {/* Footer Links */}
                <div className="flex items-center space-x-4 text-sm">
                    <Link to="/privacy" className="hover:text-blue-400 transition">
                        Privacy Policy
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link to="/tos" className="hover:text-blue-400 transition">
                        Terms of Service
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link to="/contact" className="hover:text-blue-400 transition">
                        Contact
                    </Link>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                    <Link
                        to={User.mapUrl}
                        className="text-white transition hover:text-blue-400 transform hover:-translate-y-1"
                        title="Location"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
