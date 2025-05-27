import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './TrackPage.module.css';
import Header from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';

/**
 * TrackPage - track details page.
 * @returns {JSX.Element}
 */
const TrackPage: React.FC = () => {
    const { trackId } = useParams<{ trackId: string }>();
    const [track, setTrack] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!trackId) return;
        setLoading(true);
        setError(null);
        // Try to fetch by mbid first, fallback to name search
        const fetchTrack = async () => {
            let info;
            // Try mbid
            info = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=${encodeURIComponent(trackId)}&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json());
            if (info.error || !info.track) {
                // Fallback: treat as name, try to parse artist and track
                const [artist, name] = decodeURIComponent(trackId).split(' - ');
                if (artist && name) {
                    info = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(name)}&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json());
                } else {
                    info = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${encodeURIComponent(trackId)}&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json());
                }
            }
            if (info.error || !info.track) {
                setError('Could not load track info. Please try again.');
                setTrack(null);
            } else {
                setTrack(info.track);
            }
            setLoading(false);
        };
        fetchTrack();
    }, [trackId]);

    const getDuration = (duration: string | undefined) => {
        if (!duration || isNaN(Number(duration))) return '-';
        const sec = Number(duration);
        const min = Math.floor(sec / 60);
        const s = sec % 60;
        return `${min}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles['track-page']}>
            <Header />
            <main className={styles['track-page__main']}>
                {loading ? (
                    <div className={styles['track-page__loading']} />
                ) : error ? (
                    <div className={styles['track-page__error']}>
                        {error}
                        <button className={styles['track-page__retry']} onClick={() => window.location.reload()}>Retry</button>
                    </div>
                ) : track ? (
                    <section className={styles['track-page__content']}>
                        <div className={styles['track-page__cover-wrapper']}>
                            {track.album?.image?.[2]?.['#text'] ? (
                                <img
                                    className={styles['track-page__cover']}
                                    src={track.album.image[2]['#text']}
                                    alt={track.name}
                                />
                            ) : (
                                <div className={styles['track-page__cover--placeholder']} />
                            )}
                        </div>
                        <div className={styles['track-page__info']}>
                            <h1 className={styles['track-page__title']}>{track.name}</h1>
                            <div className={styles['track-page__artist']}>
                                by{' '}
                                <a href={`/artist/${encodeURIComponent(track.artist?.name || track.artist)}`} className={styles['track-page__artist-link']}>
                                    {track.artist?.name || track.artist}
                                </a>
                            </div>
                            {track.album?.title && (
                                <div className={styles['track-page__album']}>
                                    Album: <span className={styles['track-page__album-title']}>{track.album.title}</span>
                                </div>
                            )}
                            <div className={styles['track-page__meta']}>
                                <span>Duration: {getDuration(track.duration)}</span>
                                <span>Listeners: {track.listeners}</span>
                                <span>Playcount: {track.playcount}</span>
                            </div>
                            {track.wiki?.summary && (
                                <div className={styles['track-page__summary']} dangerouslySetInnerHTML={{ __html: track.wiki.summary }} />
                            )}
                        </div>
                    </section>
                ) : null}
            </main>
            <Footer />
        </div>
    );
};

export default TrackPage; 