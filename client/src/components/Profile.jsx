import React, { useState, useEffect } from 'react'
import { Mail, Calendar, User, Shield, LogOut ,Lock} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const n = useNavigate()
    const u = JSON.parse(localStorage.getItem("user"))


    const clear_data = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    const goToReset = () => {
        n("/reset")
    }

    const d = (v) => v ? new Date(v).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "21/01/2025"


    return (
        <div className="min-h-screen bg-gray-50 mt-10">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-16 relative">
                        <div className="absolute -bottom-12 left-6">
                            <div className="bg-white p-2 rounded-full border-4 border-white shadow-lg">
                                <div className="bg-indigo-100 h-24 w-24 rounded-full flex items-center justify-center">
                                    <User size={48} className="text-indigo-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-16 pb-6 px-6">
                        <h1 className="text-2xl font-bold text-gray-900">{u?.fullName}</h1>
                        <p className="text-gray-500">{u?.isAdmin ? 'Admin' : 'Member'}</p>
                    </div>
                    <div className="px-6 pb-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Mail className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{u?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Calendar className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{u?.isAdmin ? 'Admin' : 'Member'} Since</p>
                                        <p className="font-medium">{d(u?.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <Shield className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Account ID</p>
                                        <p className="font-medium text-sm truncate">
                                            {u?.email?.split('@')[0]}{u?._id?.slice(0, 4)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => clear_data()} className="p-4 bg-red-50 rounded-lg shadow-sm cursor-pointer hover:bg-red-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-100 p-2 rounded-lg">
                                        <LogOut className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <button className="font-medium text-red-600">Sign Out</button>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => goToReset()} className="p-4 bg-yellow-50 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="bg-yellow-100 p-2 rounded-lg">
                                        <Lock className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <button className="font-medium text-yellow-600">Reset Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
