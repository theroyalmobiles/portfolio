import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/products.module.css';
import { prt, iurl } from '../utils/prt';
import Actions from './Actions';
import ProductCards from './ProductCards';

const Services = () => {
    const [services, setServices] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        const getService = async () => {
            try {
                const response = await axios.get(`${prt}/api/services`);
                setServices(response.data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            }
        };

        getService();
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

            <h1>Our Services</h1>
            <ProductCards data={services} cname="services" />

        </div>
    );
};

export default Services;
