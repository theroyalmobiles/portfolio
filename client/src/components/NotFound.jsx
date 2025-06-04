import React from 'react';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.NotFoundContainer}>
            <div className={styles.Content}>
                <div className={styles.PhoneIcon}>
                    📱
                </div>

                <h1 className={styles.ErrorCode}>404</h1>
                <h2 className={styles.ErrorTitle}>Page Not Found</h2>

                <p className={styles.ErrorDescription}>
                    Oops! Looks like this page has gone missing from our mobile store.
                </p>

                <button
                    onClick={() => window.location.href = '/'}
                    className={styles.HomeButton}
                >
                    Back to Home
                </button>
            </div>

            <div className={styles.BackgroundDecoration}>
                <div className={`${styles.FloatingCircle} ${styles.Circle1}`}></div>
                <div className={`${styles.FloatingCircle} ${styles.Circle2}`}></div>
                <div className={`${styles.FloatingCircle} ${styles.Circle3}`}></div>
            </div>
        </div>
    );
};

export default NotFound;