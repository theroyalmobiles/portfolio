import React from 'react';
import styles from './Home.module.css';
import { HeroH, AboutH, ContactH, ServicesH, ProductsH } from './sections';

export default function Home() {
    return (
        <div className={styles.frame}>
            <div className={styles.body}>
                <div className={styles.container}>
                    <HeroH />
                    <ServicesH />
                    <ProductsH />
                    <AboutH />
                    <ContactH />
                </div>
            </div>
        </div>
    );
}