import React, { useEffect, useState } from 'react';
import styles from './PopularTracks.module.css';

interface Track {
    name: string;
    artist: { name: string };
    image: { '#text': string; size: string }[];
    mbid: string;
    url: string;
}

/**
 * PopularTracks widget - displays top 20 tracks from Last.fm.
 * @returns {JSX.Element}
 */
const PopularTracks: React.FC = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTracks() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    'https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=20&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json'
                );
                if (!res.ok) throw new Error('Failed to fetch tracks');
                const data = await res.json();
                setTracks(data.tracks.track);
            } catch (e) {
                setError('Could not load tracks. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        fetchTracks();
    }, []);

    if (loading) {
        return (
            <section className={styles['popular']}>
                <h2 className={styles['popular__title']}>Popular tracks</h2>
                <div className={styles['popular__columns']}>
                    {[0, 1].map((col) => (
                        <div className={styles['popular__column']} key={col}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div className={styles['popular__track']} key={i}>
                                    <div className={styles['popular__cover--loading']} />
                                    <div className={styles['popular__info']}>
                                        <div className={styles['popular__name--loading']} />
                                        <div className={styles['popular__artist--loading']} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles['popular']}>
                <h2 className={styles['popular__title']}>Popular tracks</h2>
                <div className={styles['popular__error']}>{error}</div>
                <button className={styles['popular__retry']} onClick={() => window.location.reload()}>Retry</button>
            </section>
        );
    }

    return (
        <section className={styles['popular']}>
            <h2 className={styles['popular__title']}>Popular tracks</h2>
            <div className={styles['popular__columns']}>
                {[0, 1].map((col) => (
                    <div className={styles['popular__column']} key={col}>
                        {tracks.slice(col * 10, col * 10 + 10).map((track) => (
                            <a
                                className={styles['popular__track']}
                                href={`/track/${track.mbid || encodeURIComponent(track.name)}`}
                                key={track.mbid || track.url}
                            >
                                <img
                                    className={styles['popular__cover']}
                                    src={track.image[1]?.['#text'] || ''}
                                    alt={track.name}
                                    loading="lazy"
                                />
                                <div className={styles['popular__info']}>
                                    <div className={styles['popular__name']}>{track.name}</div>
                                    <div className={styles['popular__artist']}>{track.artist.name}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularTracks; 