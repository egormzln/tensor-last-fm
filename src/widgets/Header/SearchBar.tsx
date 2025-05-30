import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form className={styles['searchbar']} onSubmit={handleSearch} role="search">
            <input
                className={styles['searchbar__input']}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search music, artists, tracks…"
                aria-label="Search"
            />
            <button className={styles['searchbar__button']} type="submit" aria-label="Search">
                <svg className={styles['searchbar__icon']} width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                    <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </form>
    );
};

export default SearchBar;