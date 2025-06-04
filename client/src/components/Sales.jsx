import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/products.module.css';
import { prt } from '../utils/prt';
import ProductCards from './ProductCards';
import './aa.css';
const Sales = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${prt}/api/sales`);
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <p className="error">Failed to load data: {error}</p>;
    }

    return (
        <div className={styles.pContainer}>
            <h1>Mobile Sales</h1>
            <ProductCards data={products} cname="sales" />
                
        </div>
    );
};

export default Sales;
