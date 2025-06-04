// MODEL
// src/models/AuthModel.js
export default class AuthModel {
    static async requestPasswordReset(email) {
        try {
            // This would typically be an API call to your backend
            const response = await fetch('/api/auth/request-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            return await response.json();
        } catch (error) {
            console.error('Error requesting password reset:', error);
            throw error;
        }
    }

    static async sendOtpViaEmailJS(email) {
        try {
            // Example using EmailJS
            const templateParams = {
                to_email: email,
                // You might want to generate OTP on server and return it in requestPasswordReset
                // Here we're assuming the OTP was sent from the backend
            };

            // Replace with your actual EmailJS service ID, template ID, and user ID
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                templateParams,
                'YOUR_USER_ID'
            );

            return response;
        } catch (error) {
            console.error('Error sending OTP via EmailJS:', error);
            throw error;
        }
    }

    static async verifyOtp(email, otp) {
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });

            return await response.json();
        } catch (error) {
            console.error('Error verifying OTP:', error);
            throw error;
        }
    }

    static async resetPassword(email, newPassword) {
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });

            return await response.json();
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    }
}

// CONTROLLER
// src/controllers/PasswordResetController.js
import { useState } from 'react';
import AuthModel from '../models/AuthModel';

export default function usePasswordResetController() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleEmailSubmit = async () => {
        if (!email) {
            setError('Email is required');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Request password reset from backend
            const response = await AuthModel.requestPasswordReset(email);

            if (response.success) {
                // Send OTP via EmailJS
                await AuthModel.sendOtpViaEmailJS(email);
                setOtpSent(true);
                setStep(2);
            } else {
                setError(response.message || 'Error requesting password reset');
            }
        } catch (error) {
            setError('Failed to send OTP. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        if (!otp) {
            setError('OTP is required');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await AuthModel.verifyOtp(email, otp);

            if (response.success) {
                setStep(3);
            } else {
                setError(response.message || 'Invalid OTP');
            }
        } catch (error) {
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!newPassword) {
            setError('New password is required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await AuthModel.resetPassword(email, newPassword);

            if (response.success) {
                // Password reset successful, redirect to login
                window.location.href = '/login';
            } else {
                setError(response.message || 'Failed to reset password');
            }
        } catch (error) {
            setError('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        otp,
        setOtp,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        step,
        loading,
        error,
        otpSent,
        handleEmailSubmit,
        handleOtpSubmit,
        handlePasswordReset
    };
}

// VIEW
// src/views/PasswordResetView.jsx
import { useEffect } from 'react';
import usePasswordResetController from '../controllers/PasswordResetController';

export default function PasswordResetView() {
    const {
        email,
        setEmail,
        otp,
        setOtp,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        step,
        loading,
        error,
        otpSent,
        handleEmailSubmit,
        handleOtpSubmit,
        handlePasswordReset
    } = usePasswordResetController();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Your Password
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {step === 1 && (
                    <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleEmailSubmit(); }}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleOtpSubmit(); }}>
                        <div>
                            <p className="text-sm text-gray-600 mb-4">
                                We've sent an OTP to your email. Please enter it below to continue.
                            </p>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="otp" className="sr-only">OTP</label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !otpSent}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading || !otpSent ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handlePasswordReset(); }}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="new-password" className="sr-only">New Password</label>
                                <input
                                    id="new-password"
                                    name="newPassword"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                                <input
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

// App.jsx - Add this route to your routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordResetView from './views/PasswordResetView';

function App() {
    return (
        <Router>
            <Routes>
                {/* Your existing routes */}
                <Route path="/reset" element={<PasswordResetView />} />
            </Routes>
        </Router>
    );
}

// EmailJS setup - Include this in your main entry file or a separate service file
// src/services/emailService.js
import emailjs from '@emailjs/browser';

// Initialize EmailJS
// Replace 'YOUR_USER_ID' with your actual EmailJS user ID
export const initEmailJS = () => {
    emailjs.init('YOUR_USER_ID');
  };