import React, { useEffect, useState } from 'react';

const InvalidType = ({ type }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        setIsVisible(true);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Animated error container */}
            <div
                className={`max-w-md w-full mx-auto transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}
            >
                {/* Error icon animation */}
                <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-25"></div>
                    <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-lg animate-pulse">
                        <svg className="h-16 w-16 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                {/* Error message card */}
                <div
                    className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                >
                    <div className="h-2 bg-gradient-to-r from-red-400 to-red-600"></div>

                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Configuration Error</h2>
                        <p className="text-red-600 text-center mb-6">
                            Invalid schema for type: <span className="font-bold">{type}</span>
                        </p>

                        {/* Animated illustration */}
                        <div className="flex justify-center mb-6">
                            <div className="w-64 h-48 bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src="/images/config.gif"
                                    alt="Error illustration"
                                    className="mx-auto mb-4"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                onClick={() => window.history.back()}
                                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Go Back
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer message */}
                <p className={`text-center text-gray-500 mt-4 text-sm transition-opacity duration-500 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}>
                    Please check your configuration and try again
                </p>
            </div>
        </div>
    );
};

export default InvalidType;