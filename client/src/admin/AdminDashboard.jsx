import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { prt } from '../utils/prt';
import ProductCards from '../components/ProductCards';
import './ad.css';

const CATEGORIES = ['sales', 'services', 'accessories'];
const SORT_OPTIONS = [
    { value: '', label: 'Sort by' },
    { value: 'lth', label: 'Price: Low to High' },
    { value: 'htl', label: 'Price: High to Low' },
    { value: 'az', label: 'Name: A-Z' },
    { value: 'za', label: 'Name: Z-A' }
];

const AdminDashboard = () => {
    // State management
    const [productData, setProductData] = useState({ sales: [], services: [], accessories: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('sales');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [activeBrands, setActiveBrands] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [showAddDropdown, setShowAddDropdown] = useState(false);

    // Refs
    const filterPanelRef = useRef(null);
    const productGridRef = useRef(null);

    // Fetch product data on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${prt}/api/products`);
                const data = await response.json();

                setProductData({
                    sales: data.sales || [],
                    services: data.services || [],
                    accessories: data.accessories || []
                });
                setIsLoading(false);

                if (productGridRef.current) {
                    productGridRef.current.classList.add('animate-fade-in');
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle filter panel animation
    useEffect(() => {
        if (!filterPanelRef.current) return;

        if (showFilters) {
            filterPanelRef.current.classList.add('filter-panel-expand');
            filterPanelRef.current.classList.remove('filter-panel-collapse');
        } else {
            filterPanelRef.current.classList.add('filter-panel-collapse');
            filterPanelRef.current.classList.remove('filter-panel-expand');
        }
    }, [showFilters]);

    // Calculate filtered products based on active filters
    const filteredProducts = useMemo(() => {
        const currentProducts = productData[activeCategory] || [];

        return currentProducts.filter(product => {
            const matchesSearch =
                searchTerm === '' ||
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPrice =
                product.price >= priceRange[0] &&
                product.price <= priceRange[1];

            const matchesBrand =
                activeBrands.length === 0 ||
                activeBrands.includes(product.brand);

            return matchesSearch && matchesPrice && matchesBrand;
        });
    }, [productData, activeCategory, searchTerm, priceRange, activeBrands]);

    // Get sorted products based on selected sort option
    const displayedData = useMemo(() => {
        if (sortOption === "lth") return [...filteredProducts].sort((a, b) => a.price - b.price);
        if (sortOption === "htl") return [...filteredProducts].sort((a, b) => b.price - a.price);
        if (sortOption === "az") return [...filteredProducts].sort((a, b) => a.product_name.localeCompare(b.product_name));
        if (sortOption === "za") return [...filteredProducts].sort((a, b) => b.product_name.localeCompare(a.product_name));
        return filteredProducts;
    }, [filteredProducts, sortOption]);

    // Get all unique brands for current category
    const allBrands = useMemo(() => {
        return [...new Set((productData[activeCategory] || []).map(item => item.brand))];
    }, [productData, activeCategory]);

    // Get max price for current category
    const maxPrice = useMemo(() => {
        return Math.max(...(productData[activeCategory] || []).map(item => item.price), 200000);
    }, [productData, activeCategory]);

    // Handle brand filter toggle
    const toggleBrand = useCallback(brand => {
        setActiveBrands(prev =>
            prev.includes(brand)
                ? prev.filter(item => item !== brand)
                : [...prev, brand]
        );
    }, []);

    // Handle category change with animation
    const changeCategory = useCallback(category => {
        if (productGridRef.current) {
            productGridRef.current.classList.remove('animate-fade-in');
            productGridRef.current.classList.add('animate-fade-out');

            setTimeout(() => {
                setActiveCategory(category);
                setActiveBrands([]);

                setTimeout(() => {
                    if (productGridRef.current) {
                        productGridRef.current.classList.remove('animate-fade-out');
                        productGridRef.current.classList.add('animate-fade-in');
                    }
                }, 50);
            }, 300);
        } else {
            setActiveCategory(category);
            setActiveBrands([]);
        }
    }, []);

    const getCategoryTitle = () => {
        switch (activeCategory) {
            case 'sales': return 'Phones & Devices';
            case 'services': return 'Services';
            case 'accessories': return 'Accessories';
            default: return activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-7">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between" style={{ maxWidth: '1300px' }}>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative group">
                            <div className="flex">
                                <button
                                    className="relative bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-l-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md flex items-center"
                                    onClick={() => window.location.href = "/admin/add"}
                                >
                                    <span className="mr-1">+</span> Add New
                                </button>
                                <button
                                    className="relative bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-r-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
                                    onClick={() => setShowAddDropdown(!showAddDropdown)}
                                    aria-label="Show options"
                                    aria-expanded={showAddDropdown}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            {showAddDropdown && (
                                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-50 w-40">
                                    {CATEGORIES.map(category => (
                                        <a
                                            key={category}
                                            href={`/admin/add?category=${category}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                                            onClick={() => setShowAddDropdown(false)}
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                            TRM
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4" style={{ maxWidth: '1300px' }}>
                    <div className="flex items-center space-x-1">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => changeCategory(category)}
                                className={`px-5 py-4 font-medium text-sm transition-all duration-300 relative ${activeCategory === category
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                {activeCategory === category && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-grow-width"></span>
                                )}
                            </button>
                        ))}

                        {/* Search and Filter */}
                        <div className="ml-auto flex items-center">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    autoFocus
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`ml-3 p-2 rounded-full transition-all duration-300 ${showFilters ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                    }`}
                                aria-label="Toggle filters"
                                aria-expanded={showFilters}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            <div
                ref={filterPanelRef}
                className={`bg-white border-t border-gray-100 shadow-md overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-96' : 'max-h-0'
                    }`}
                aria-hidden={!showFilters}
            >
                <div className="container mx-auto px-4 py-4" style={{ maxWidth: '1300px' }}>
                    <div className="flex flex-wrap -mx-2">
                        <div className="px-2 w-full md:w-1/3 mb-4">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Price Range</h3>
                            <div className="px-2">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>₹{priceRange[0].toLocaleString()}</span>
                                    <span>₹{priceRange[1].toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    aria-label="Maximum price"
                                />
                            </div>
                        </div>
                        <div className="px-2 w-full md:w-2/3">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Brands</h3>
                            <div className="flex flex-wrap -mx-1">
                                {allBrands.map((brand) => (
                                    <div key={brand} className="px-1 mb-2">
                                        <button
                                            onClick={() => toggleBrand(brand)}
                                            className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${activeBrands.includes(brand)
                                                    ? 'bg-blue-100 text-blue-600 border border-blue-300'
                                                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                                                }`}
                                            aria-pressed={activeBrands.includes(brand)}
                                        >
                                            {brand}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="flex-grow container mx-auto px-4 py-6" ref={productGridRef} style={{ maxWidth: '1300px' }}>
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-gray-800">{getCategoryTitle()}</h2>
                        <p className="text-sm text-gray-500">
                            {filteredProducts.length} of {(productData[activeCategory] || []).length} items
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <select
                            className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1 text-sm"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            aria-label="Sort products"
                        >
                            {SORT_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative w-20 h-20">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                    </div>
                ) : displayedData.length === 0 ? (
                    // Empty State
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    // Products Grid
                    <div>
                        <ProductCards
                            data={displayedData}
                            cname={activeCategory}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;