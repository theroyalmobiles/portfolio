import React, { useState, useEffect } from 'react';
import { User } from '../utils/user';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { FaUser, FaCog, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import Swal from "sweetalert2";

const NavLink = ({ to, children, isDropdownParent = false }) => {
    return (
        <Link
            to={to}
            className={`hover:text-blue-800 relative group ${isDropdownParent ? 'cursor-pointer inline-block' : ''}`}
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 transition-all duration-300"></span>
        </Link>
    );
};

const NavItem = ({ item }) => {
    if (item.hasDropdown) {
        return (
            <li className="relative group">
                <span className="cursor-pointer inline-block relative group">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 transition-all duration-300"></span>
                </span>
                <ul className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 w-48 bg-white border border-blue-100 rounded-md shadow-lg py-2 mt-2 -left-4 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {item.dropdownItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="relative group/item">
                            <Link
                                to={`/${subItem.toLowerCase()}`}
                                className="block px-4 py-2 hover:bg-blue-50 transition-colors duration-200 relative group-hover/item:pl-6 transition-all"
                            >
                                {subItem}
                                <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-blue-600 group-hover/item:w-1/2 transition-all duration-300"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        );
    }

    return (
        <li className="relative group">
            <NavLink to={item.name === 'Home' ? '/' : `${item.url}`}>
                {item.name}
            </NavLink>
        </li>
    );
};

const MobileNavItem = ({ item, setIsMobileMenuOpen }) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    if (item.hasDropdown) {
        return (
            <div className="relative">
                <button
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-md relative group"
                >
                    {item.name}
                    <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 transition-all duration-300"></span>
                </button>
                {isSubmenuOpen && (
                    <div className="pl-4">
                        {item.dropdownItems.map((subItem, index) => (
                            <Link
                                key={index}
                                to={`/${subItem.toLowerCase()}`}
                                className="block px-3 py-2 hover:bg-blue-50 rounded-md relative group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {subItem}
                                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 transition-all duration-300"></span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            to={item.name === 'Home' ? '/' : `${item.url}`}
            className="block px-3 py-2 hover:bg-blue-50 rounded-md relative group"
            onClick={() => setIsMobileMenuOpen(false)}
        >
            {item.name}
            <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 transition-all duration-300"></span>
        </Link>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                setIsAdmin(user.isAdmin === "true");
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
        }
    }, []);

    const adminNavItems = [
        { name: 'Home', url: '/home', hasDropdown: false },
        { name: 'Orders', url: '/orders', hasDropdown: false },
        { name: 'Users', url: '/users', hasDropdown: false },
        { name: 'All Products', url: '/admin', hasDropdown: false }
    ];

    const regularNavItems = [
        { name: 'Home', url: '/home', hasDropdown: false },
        {
            name: 'Products',
            url: '#',
            hasDropdown: true,
            dropdownItems: ['Sales', 'Services', 'Accessories']
        },
        { name: 'About', url: '/about', hasDropdown: false },
        { name: 'Contact', url: '/contact', hasDropdown: false }
    ];

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log me out",
            cancelButtonText: "Cancel",
            dangerMode: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                setIsAdmin(false);
                setIsProfileDropdownOpen(false);
                window.location.reload();
            }
        });
    };

    const navItems = isAdmin ? adminNavItems : regularNavItems;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileDropdownOpen]);

    return (
        <nav className={`fixed navv w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/90'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="group">
                            <span className="text-2xl navbar-logo">
                                {User.shop}
                            </span>
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex space-x-8 items-center">
                            {navItems.map((item, index) => (
                                <NavItem key={index} item={item} />
                            ))}
                            {!isAdmin && (
                                <li className="relative">
                                    <Link to="/cart" className="p-2 rounded-full hover:bg-blue-50 focus:outline-none transition-colors duration-200 relative">
                                        <FaShoppingCart className="h-5 w-5 text-blue-800" />
                                    </Link>
                                </li>
                            )}
                            <li className="relative">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="p-2 rounded-full hover:bg-blue-50 focus:outline-none transition-colors duration-200"
                                >
                                    <FaUser className="h-5 w-5 text-blue-800" />
                                </button>

                                {isProfileDropdownOpen && (
                                    <ul className="absolute right-0 mt-2 w-48 bg-white border border-blue-100 rounded-md shadow-lg py-2 z-50 profile-dropdown">
                                        <li>
                                            <Link
                                                to="/settings"
                                                className="flex items-center px-4 py-2 hover:bg-blue-50 transition-colors duration-200"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <FaCog className="mr-2" /> Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-200"
                                            >
                                                <FaSignOutAlt className="mr-2" /> Log Out
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 py-3 space-y-1 sm:px-3 bg-white">
                        {navItems.map((item, index) => (
                            <MobileNavItem
                                key={index}
                                item={item}
                                setIsMobileMenuOpen={setIsMobileMenuOpen}
                            />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar