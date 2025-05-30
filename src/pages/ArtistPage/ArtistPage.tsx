import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ArtistPage.module.css';
import Header from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';
import AlbumCard from '../../features/AlbumCard/AlbumCard';

/**
 * ArtistPage - artist details page.
 * @returns {JSX.Element}
 */
const ArtistPage: React.FC = () => {
    const { artistName } = useParams<{ artistName: string }>();
    const [artist, setArtist] = useState<any>(null);
    const [topTracks, setTopTracks] = useState<any[]>([]);
    const [topAlbums, setTopAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!artistName) return;
        setLoading(true);
        setError(null);
        Promise.all([
            fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json()),
            fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artistName)}&limit=8&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json()),
            fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&limit=6&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json()),
        ])
            .then(([info, tracks, albums]) => {
                if (info.error) throw new Error(info.message);
                setArtist(info.artist);
                setTopTracks(tracks.toptracks?.track?.slice(0, 8) || []);
                setTopAlbums(albums.topalbums?.album?.slice(0, 6) || []);
            })
            .catch(() => {
                setError('Could not load artist info. Please try again.');
            })
            .finally(() => setLoading(false));
    }, [artistName]);

    return (
        <div className={styles['artist-page']}>
            <Header />
            <main className={styles['artist-page__main']}>
                {loading ? (
                    <div className={styles['artist-page__loading']} />
                ) : error ? (
                    <div className={styles['artist-page__error']}>
                        {error}
                        <button className={styles['artist-page__retry']} onClick={() => window.location.reload()}>Retry</button>
                    </div>
                ) : artist ? (
                    <>
                        <section className={styles['artist-page__header']}>
                            <img
                                className={styles['artist-page__avatar']}
                                src={artist.image?.[3]?.['#text'] || ''}
                                alt={artist.name}
                            />
                            <div className={styles['artist-page__info']}>
                                <h1 className={styles['artist-page__name']}>{artist.name}</h1>
                                <div className={styles['artist-page__bio']} dangerouslySetInnerHTML={{ __html: artist.bio?.summary || '' }} />
                            </div>
                        </section>
                        <section className={styles['artist-page__section']}>
                            <h2 className={styles['artist-page__section-title']}>Top Tracks</h2>
                            <ul className={styles['artist-page__tracks-list']}>
                                {topTracks.map((track: any) => (
                                    <li key={track.mbid || track.name}>
                                        <a className={styles['artist-page__track-link']} href={`/track/${track.mbid || encodeURIComponent(track.name)}`}>{track.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className={styles['artist-page__section']}>
                            <h2 className={styles['artist-page__section-title']}>Top Albums</h2>
                            <div className={styles['artist-page__albums-grid']}>
                                {topAlbums.map((album: any) => (
                                    <AlbumCard
                                        key={album.mbid || album.name}
                                        title={album.name}
                                        artist={album.artist?.name || artist.name}
                                        imageUrl={album.image?.[2]?.['#text'] || ''}
                                    />
                                ))}
                            </div>
                        </section>
                    </>
                ) : null}
            </main>
            <Footer />
        </div>
    );
};

export default ArtistPage; 