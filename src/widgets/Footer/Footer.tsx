import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer component for site info and links.
 * @returns {JSX.Element}
 */
const Footer: React.FC = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer__columns']}>
                <div className={styles['footer__col']}>
                    <div className={styles['footer__title']}>About</div>
                    <a className={styles['footer__link']} href="#">About Last.fm</a>
                    <a className={styles['footer__link']} href="#">Contact</a>
                    <a className={styles['footer__link']} href="#">Jobs</a>
                </div>
                <div className={styles['footer__col']}>
                    <div className={styles['footer__title']}>API</div>
                    <a className={styles['footer__link']} href="#">API Docs</a>
                    <a className={styles['footer__link']} href="#">Scrobble</a>
                </div>
                <div className={styles['footer__col']}>
                    <div className={styles['footer__title']}>Support</div>
                    <a className={styles['footer__link']} href="#">Help</a>
                    <a className={styles['footer__link']} href="#">Community</a>
                </div>
                <div className={styles['footer__col']}>
                    <div className={styles['footer__title']}>Legal</div>
                    <a className={styles['footer__link']} href="#">Privacy</a>
                    <a className={styles['footer__link']} href="#">Terms</a>
                </div>
            </div>
            <div className={styles['footer__bottom']}>
                <span className={styles['footer__lang']}>English</span>
                <span className={styles['footer__copyright']}>&copy; 2024 Last.fm</span>
            </div>
        </footer>
    );
};

export default Footer; 