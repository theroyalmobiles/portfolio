import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { prt } from '../utils/prt'
const ProductCard = ({ product, category }) => {
    const cardRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (cardRef.current) {
            const delay = Math.random() * 0.3
            cardRef.current.style.animationDelay = `${delay}s`
            cardRef.current.classList.add('animate-card-appear')
        }
    }, [])

    const handleEditClick = () => {
        navigate(`/admin/edit/${product._id}`)
    }

    const handleDeleteClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this product?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${prt}/api/${category}/${product._id}`)
                    onProductRemove(product)
                    Swal.fire('Deleted!', 'Product has been deleted.', 'success')
                } catch {
                    Swal.fire('Error', 'Failed to delete from server', 'error')
                }
            }
        })
    }

    const onProductRemove = () => {
        window.location.reload()
    }

    const renderSpecificDetails = () => {
        if (category === 'sales') return <div className="text-gray-500 text-sm mb-2">{product.model}</div>
        if (category === 'services') return <div className="text-xs text-purple-600 mb-2">{product.category} | Updated: {new Date(product.last_updated).toLocaleDateString()}</div>
        if (category === 'accessories') return <div className="text-xs text-green-600 mb-2">{product.category} | {product.compatibility}</div>
        return null
    }

    return (
        <div ref={cardRef} className="bg-white rounded-lg shadow overflow-hidden transform transition hover:-translate-y-1 hover:shadow-md opacity-0">
            <div className="h-48 overflow-hidden relative group">
                <img src={product.image_url || '/imgs/default-img.png'} alt={product.product_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.src = '/imgs/default-img.png' }} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex justify-center items-end p-3 space-x-2">
                    <button onClick={handleEditClick} className="bg-white text-gray-800 p-2 rounded-full hover:bg-blue-500 hover:text-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={handleDeleteClick} className="bg-white text-gray-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium shadow-sm">{product.brand}</div>
                <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">{product._id?.slice(-5)}</div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.product_name}</h3>
                {renderSpecificDetails()}
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 h-8">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-all"
                        onClick={()=>console.log(product)}
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
