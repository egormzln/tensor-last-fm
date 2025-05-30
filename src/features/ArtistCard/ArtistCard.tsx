import React from 'react';
import styles from './ArtistCard.module.css';

interface ArtistCardProps {
    name: string;
    imageUrl?: string;
}

/**
 * ArtistCard - displays an artist's image and name.
 * @param {ArtistCardProps} props
 * @returns {JSX.Element}
 */
const ArtistCard: React.FC<ArtistCardProps> = ({ name, imageUrl }) => {
    return (
        <a className={styles['artist-card']} href={`/artist/${encodeURIComponent(name)}`}>
            <div className={styles['artist-card__avatar-wrapper']}>
                {imageUrl ? (
                    <img className={styles['artist-card__avatar']} src={imageUrl} alt={name} loading="lazy" />
                ) : (
                    <div className={styles['artist-card__avatar--placeholder']} />
                )}
            </div>
            <div className={styles['artist-card__name']}>{name}</div>
        </a>
    );
};

export default ArtistCard; 