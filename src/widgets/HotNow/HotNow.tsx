import React, { useEffect, useState } from 'react';
import styles from './HotNow.module.css';

interface Artist {
    name: string;
    image: { '#text': string; size: string }[];
}

/**
 * HotNow widget - displays top 12 artists from Last.fm.
 * @returns {JSX.Element}
 */
const HotNow: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArtists() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=12&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json'
                );
                if (!res.ok) throw new Error('Failed to fetch artists');
                const data = await res.json();
                setArtists(data.artists.artist);
            } catch (e) {
                setError('Could not load artists. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        fetchArtists();
    }, []);

    if (loading) {
        return (
            <section className={styles['hotnow']}>
                <h2 className={styles['hotnow__title']}>Music</h2>
                <div className={styles['hotnow__grid']}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div className={styles['hotnow__card']} key={i}>
                            <div className={styles['hotnow__avatar--loading']} />
                            <div className={styles['hotnow__name--loading']} />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles['hotnow']}>
                <h2 className={styles['hotnow__title']}>Music</h2>
                <div className={styles['hotnow__error']}>{error}</div>
                <button className={styles['hotnow__retry']} onClick={() => window.location.reload()}>Retry</button>
            </section>
        );
    }

    return (
        <section className={styles['hotnow']}>
            <h2 className={styles['hotnow__title']}>Music</h2>
            <div className={styles['hotnow__grid']}>
                {artists.map((artist) => (
                    <a
                        className={styles['hotnow__card']}
                        href={`/artist/${encodeURIComponent(artist.name)}`}
                        key={artist.name}
                    >
                        <img
                            className={styles['hotnow__avatar']}
                            src={artist.image[2]?.['#text'] || ''}
                            alt={artist.name}
                            loading="lazy"
                        />
                        <div className={styles['hotnow__name']}>{artist.name}</div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default HotNow; 