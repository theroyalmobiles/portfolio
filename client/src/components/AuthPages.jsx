import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { showToast } from '../pages/ToastManager';

import { prt } from '../utils/prt';


const AuthPages = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLogin) {
            console.log('Login attempt:', { email: formData.email, password: formData.password })
            const res = await fetch(`${prt}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })
            const data = await res.json()
            if (!res.ok) {
                setFormData({
                    ...formData,
                    password:'',
                })
                showToast(data.message || 'Login failed', "error");
                return
            }
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("userId", data.user._id)
            console.log(data)
            window.location.href = "/"
        } else {
            console.log('Signup attempt:', formData)
            const res = await fetch(`${prt}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                })
            })
            const data = await res.json()
            if (!res.ok) {
                showToast(data.message || 'Signup failed',"error");
                return
            }
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("userId", data.user._id)
            console.log(data)
            window.location.href = "/"
        }

        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: ''
        })
    }

    const toggleAuthMode = () => {
        setIsLogin(!isLogin)
    }


    return (

        <div className="mt-[0px] scale-[0.95] origin-center h-screen rounded-[30px] bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col md:flex-row overflow-hidden">
            { }
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex w-full md:w-3/5 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 flex-col justify-center items-center"
            >

                <div className="max-w-lg mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="mb-8"
                    >
                        <img
                            src="/images/hero-right.png"
                            alt="Mobile Store"
                            className="rounded-2xl shadow-2xl mx-auto w-full h-auto"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold mb-4"
                    >
                        The Royal Mobiles
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-indigo-100 mb-6"
                    >
                        Discover the latest smartphones and accessories at unbeatable prices
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                            <div className="bg-indigo-500 p-2 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <span>24/7 Support</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                            <div className="bg-indigo-500 p-2 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                                </svg>
                            </div>
                            <span>Fast Delivery</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                            <div className="bg-indigo-500 p-2 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>Latest Models</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            { }
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-2/5 p-8 flex items-center justify-center"
            >
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {isLogin ? 'Welcome Back!' : 'Join Us Today'}
                            </h2>
                            <p className="text-gray-600">
                                {isLogin
                                    ? 'Sign in to access your account'
                                    : 'Create an account to get started'
                                }
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            { }
                            {!isLogin && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mb-6"
                                >
                                    <label className="block text-gray-700 text-sm font-medium text-[20px] mb-2" htmlFor="fullName">
                                        Full Name
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="your name"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required={!isLogin}
                                    />
                                </motion.div>
                            )}

                            { }
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium text-[20px] mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            { }
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium text-[20px] mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="***"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            { }
                            {!isLogin && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mb-6"
                                >
                                    <label className="block text-gray-700 text-sm font-medium text-[20px] mb-2" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required={!isLogin}
                                    />
                                </motion.div>
                            )}

                            { }
                            {isLogin && (
                                <div className="mb-6 text-right">
                                    <Link to="/reset" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                            )}

                            { }
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium text-[20px] hover:opacity-90 transition-all shadow-md"
                                type="submit"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </motion.button>


                        </form>
                        <br />
                        { }
                        <div className="text-center">
                            <p className="text-gray-600">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    onClick={toggleAuthMode}
                                    className="ml-1 text-indigo-600 hover:text-indigo-800 font-medium text-[20px] transition-colors cursor-pointer"
                                >
                                    {isLogin ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPages;