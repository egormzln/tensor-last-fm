import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

/**
 * Header component for site navigation.
 * @returns {JSX.Element}
 */
const Header: React.FC = () => {
    return (
        <header className={styles['header']}>
            <div className={styles['header__logo']}>last.fm</div>
            <nav className={styles['header__nav']}>
                <Link className={styles['header__link']} to="/live">Live</Link>
                <Link className={styles['header__link']} to="/">Music</Link>
                <Link className={styles['header__link']} to="/charts">Charts</Link>
                <Link className={styles['header__link']} to="/events">Events</Link>
                <Link className={styles['header__link']} to="/features">Features</Link>
            </nav>
            <div className={styles['header__search']}>
                <SearchBar />
            </div>
        </header>
    );
};

export default Header; 