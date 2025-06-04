import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RedirectionS = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(5);

    useEffect(() => {
        setProgress(5);

        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 99) {
                    clearInterval(interval);
                    setTimeout(() => navigate("/"), 100);
                    return 99;
                }
                return prevProgress + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <ArrowRight className="h-8 w-8 text-blue-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        301 Permanent Redirect
                    </h1>

                    <p className="text-gray-600 mb-6">
                        This page has been permanently moved to a new location.
                        You will be automatically redirected to the new address.
                    </p>

                    <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-gray-500">
                        If you are not redirected automatically,
                        please click the link below
                    </p>

                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                        <Link to="/">Go to new location</Link>
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RedirectionS;