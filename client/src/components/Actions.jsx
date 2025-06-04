import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, ShoppingCart, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import addToCart from "../pages/cartadd";
import { prt } from '../utils/prt'

const Actions = ({ id = 1, pname = "sales", cname = "*" }) => {
    const isAdmin = window.location.pathname === "/admin"; // Check if the current path is "/admin"

    const handleDelete = async () => {
        // Show a confirmation dialog with SweetAlert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${prt}/api/${cname}/${id}`);
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                );
                // Optionally, redirect to the previous page or a specific page
                window.location.href = `/admin`;
            } catch (error) {
                console.error('Failed to delete item:', error);
                Swal.fire(
                    'Error!',
                    'There was a problem deleting the item.',
                    'error'
                );
            }
        }
    };

    const handleEdit = () => {
        // Navigate to the edit page
        window.location.href = `/admin/edit/${id}?category=${cname}`;
    };

    return (
        <div className="w-full">
            <div className="flex flex-row gap-[5px]">
                {isAdmin ? (
                    // Only show Edit and Delete for Admin
                    <div className="flex gap-[5px]">
                        <button
                            onClick={handleEdit}
                            className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
                        >
                            <Edit2 className="w-5 h-5" />
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
                        >
                            <Trash2 className="w-5 h-5" />
                            Delete
                        </button>
                    </div>
                ) : (
                    // Default buttons for non-admin users
                    <>
                        <Link to={`/${cname}/details/${id}`} className="flex-1">
                            <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base">
                                <ArrowRight className="w-5 h-5" />
                                More Details
                            </button>
                        </Link>
                        <div className="flex-1">
                            <button
                                onClick={() => { addToCart(id, cname, pname) }}
                                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Actions;
