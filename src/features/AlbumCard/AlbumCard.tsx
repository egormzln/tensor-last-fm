import React from 'react';
import styles from './AlbumCard.module.css';

interface AlbumCardProps {
    title: string;
    artist: string;
    imageUrl?: string;
}

/**
 * AlbumCard - displays an album's cover, title, and artist.
 * @param {AlbumCardProps} props
 * @returns {JSX.Element}
 */
const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, imageUrl }) => {
    return (
        <div className={styles['album-card']}>
            <div className={styles['album-card__cover-wrapper']}>
                {imageUrl ? (
                    <img className={styles['album-card__cover']} src={imageUrl} alt={title} loading="lazy" />
                ) : (
                    <div className={styles['album-card__cover--placeholder']} />
                )}
            </div>
            <div className={styles['album-card__title']}>{title}</div>
            <div className={styles['album-card__artist']}>{artist}</div>
        </div>
    );
};

export default AlbumCard; 