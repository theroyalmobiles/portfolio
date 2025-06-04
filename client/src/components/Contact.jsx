import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { User } from "../utils/user"

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('Send Message');
    const [error, setError] = useState({ email: false, required: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            setError({ ...error, required: true });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError({ ...error, email: true });
            return;
        }

        setError({ email: false, required: false });
        setStatus('Sending...');

        const serviceID = import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID;
        const options = { publicKey: import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY };

        try {
            const res = await emailjs.send(serviceID, templateID, formData, options);

            if (res.status === 200) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('Send Message'), 1500);
            }
        } catch (error) {
            setStatus('Failed to send message.');
            console.error(error);
        }
    };

    return (
        <div className="font-inter leading-relaxed mt-20 bg-gray-100 text-gray-800">
            {/* Header */}
            <header className="bg-gradient-to-r from-gray-800 to-blue-500 text-white py-10 text-center mb-12 shadow-md">
                <h1 className="text-4xl font-bold mb-2 tracking-wide">Contact Us</h1>
                <p className="text-lg opacity-90">We're here to help!</p>
            </header>

            {/* Contact Form */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-blue-600">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {error.email && <p className="text-sm text-red-500 mt-1">Please enter a valid email!</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    placeholder="Enter your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg h-40 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
                                ></textarea>
                            </div>
                            {error.required && <p className="text-sm text-red-500">All fields are required!</p>}
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300">
                                {status}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-blue-600">Contact Information</h2>
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-blue-500 mt-1">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <div>
                                    <strong>Email</strong>
                                    <p className="text-sm text-gray-700">{User.mail}</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-blue-500 mt-1">
                                    <path d="M21 15.46l-5.27-.61a.997.997 0 00-.96.27l-2.11 2.11a16.476 16.476 0 01-7.07-7.07l2.11-2.11a.997.997 0 00.27-.96L8.54 3c-.07-.39-.37-.68-.76-.73L3 1.99c-.83-.09-1.52.59-1.43 1.42C2.8 12.15 10.85 20.2 20.59 21.43c.83.09 1.52-.6 1.42-1.43l-1.28-5.24c-.05-.39-.34-.69-.73-.76z" />
                                </svg>
                                <div>
                                    <strong>Phone</strong>
                                    <p className="text-sm text-gray-700">{User.phone}</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-blue-500 mt-1">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                                </svg>
                                <div>
                                    <strong>Location</strong>
                                    <p className="text-sm text-gray-700">{User.address}</p>
                                </div>
                            </div>

                            {/* Embedded Map */}
                            <div className="rounded-xl overflow-hidden shadow-md">
                                <iframe
                                    title="Store Location"
                                    src={User.embedMap}
                                    className="w-full h-[200px] border-none"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;