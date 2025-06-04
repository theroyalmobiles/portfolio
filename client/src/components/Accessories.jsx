import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import styles from '../styles/products.module.css';
import ProductCards from './ProductCards';

import { prt, iurl } from '../utils/prt';
import Actions from './Actions';

const Accessories = () => {
    const [accessories, setAccessories] = useState([]);


    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await axios.get(`${prt}/api/accessories`);
                setAccessories(response.data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            }
        };

        fetchAccessories();
    }, []);

    const handleImageError = (event) => {
        if (!event.target.dataset.error) {
            event.target.dataset.error = "true";
            event.target.src = "/imgs/default-img.png";
        }
    };

    if (error) {
        return <p className="error">Failed to load data: {error}</p>;
    }

    return (
        <div className={styles.pContainer}>

            <h1>Our Accessories</h1>
            <ProductCards data={accessories} cname="accessories" />

        </div>
    );
};

export default Accessories;
