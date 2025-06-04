import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

export default function Verify() {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                {success === "true" ? (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-green-100 p-4 rounded-full">
                                <CheckCircle className="h-12 w-12 text-green-500" />
                            </div>
                        </div>

                        <div className="text-center space-y-3">
                            <h1 className="text-2xl font-bold text-gray-800">Verification Successful</h1>
                            <p className="text-gray-600">Your account has been successfully verified. You can now access all features of our platform.</p>
                        </div>

                        <button className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200">
                            Continue to Dashboard
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-red-100 p-4 rounded-full">
                                <XCircle className="h-12 w-12 text-red-500" />
                            </div>
                        </div>

                        <div className="text-center space-y-3">
                            <h1 className="text-2xl font-bold text-gray-800">Verification Failed</h1>
                            <p className="text-gray-600">The verification link appears to be invalid or has expired. Please request a new verification link.</p>
                        </div>

                        <button className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
                            Request New Link
                        </button>

                        <div className="text-center">
                            <a href="#" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                                Need help? Contact support
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}