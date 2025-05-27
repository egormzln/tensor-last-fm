import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './SearchPage.module.css';
import Header from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';
import ArtistCard from '../../features/ArtistCard/ArtistCard';
import AlbumCard from '../../features/AlbumCard/AlbumCard';
import TrackTable from '../../features/TrackTable/TrackTable';

const TABS = [
    { key: 'overview', label: 'Overview' },
    { key: 'artists', label: 'Artists' },
    { key: 'albums', label: 'Albums' },
    { key: 'tracks', label: 'Tracks' },
];

/**
 * SearchPage - search results page with tab navigation.
 * @returns {JSX.Element}
 */
const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || '';
    const tab = searchParams.get('tab') || 'overview';

    // Artists tab state
    const [artists, setArtists] = useState<any[]>([]);
    const [artistsLoading, setArtistsLoading] = useState(false);
    const [artistsError, setArtistsError] = useState<string | null>(null);

    // Albums tab state
    const [albums, setAlbums] = useState<any[]>([]);
    const [albumsLoading, setAlbumsLoading] = useState(false);
    const [albumsError, setAlbumsError] = useState<string | null>(null);

    // Tracks tab state
    const [tracks, setTracks] = useState<any[]>([]);
    const [tracksLoading, setTracksLoading] = useState(false);
    const [tracksError, setTracksError] = useState<string | null>(null);

    // Overview tab state
    const [overview, setOverview] = useState<{
        artists: any[];
        albums: any[];
        tracks: any[];
    }>({ artists: [], albums: [], tracks: [] });
    const [overviewLoading, setOverviewLoading] = useState(false);
    const [overviewError, setOverviewError] = useState<string | null>(null);

    useEffect(() => {
        if (tab === 'artists' && query) {
            setArtistsLoading(true);
            setArtistsError(null);
            fetch(
                `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(query)}&limit=12&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`
            )
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch artists');
                    return res.json();
                })
                .then((data) => {
                    setArtists(data.results.artistmatches.artist || []);
                })
                .catch(() => {
                    setArtistsError('Could not load artists. Please try again.');
                })
                .finally(() => setArtistsLoading(false));
        }
    }, [tab, query]);

    useEffect(() => {
        if (tab === 'albums' && query) {
            setAlbumsLoading(true);
            setAlbumsError(null);
            fetch(
                `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(query)}&limit=6&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`
            )
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch albums');
                    return res.json();
                })
                .then((data) => {
                    setAlbums(data.results.albummatches.album || []);
                })
                .catch(() => {
                    setAlbumsError('Could not load albums. Please try again.');
                })
                .finally(() => setAlbumsLoading(false));
        }
    }, [tab, query]);

    useEffect(() => {
        if (tab === 'tracks' && query) {
            setTracksLoading(true);
            setTracksError(null);
            fetch(
                `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(query)}&limit=10&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`
            )
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch tracks');
                    return res.json();
                })
                .then((data) => {
                    setTracks(data.results.trackmatches.track || []);
                })
                .catch(() => {
                    setTracksError('Could not load tracks. Please try again.');
                })
                .finally(() => setTracksLoading(false));
        }
    }, [tab, query]);

    useEffect(() => {
        if (tab === 'overview' && query) {
            setOverviewLoading(true);
            setOverviewError(null);
            Promise.all([
                fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(query)}&limit=3&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json()),
                fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(query)}&limit=3&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json()),
                fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(query)}&limit=3&api_key=183b7f55e4fab7785b24c5396357bfe7&format=json`).then(r => r.json()),
            ])
                .then(([artists, albums, tracks]) => {
                    setOverview({
                        artists: artists.results.artistmatches.artist || [],
                        albums: albums.results.albummatches.album || [],
                        tracks: tracks.results.trackmatches.track || [],
                    });
                })
                .catch(() => {
                    setOverviewError('Could not load overview. Please try again.');
                })
                .finally(() => setOverviewLoading(false));
        }
    }, [tab, query]);

    const handleTabClick = (tabKey: string) => {
        setSearchParams({ q: query, tab: tabKey });
    };

    return (
        <div className={styles['search-page']}>
            <Header />
            <main className={styles['search-page__main']}>
                <section className={styles['search-page__search-block']}>
                    <div className={styles['search-page__query']}>{query ? `Results for "${query}"` : 'Enter a search query'}</div>
                    <div className={styles['search-page__tabs']}>
                        {TABS.map((t) => (
                            <button
                                key={t.key}
                                className={
                                    t.key === tab
                                        ? styles['search-page__tab'] + ' ' + styles['search-page__tab--active']
                                        : styles['search-page__tab']
                                }
                                onClick={() => handleTabClick(t.key)}
                                type="button"
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </section>
                <section className={styles['search-page__results']}>
                    {tab === 'artists' && (
                        <div className={styles['search-page__artists-grid']}>
                            {artistsLoading ? (
                                Array.from({ length: 12 }).map((_, i) => (
                                    <div className={styles['search-page__artist-loading']} key={i} />
                                ))
                            ) : artistsError ? (
                                <div className={styles['search-page__error']}>
                                    {artistsError}
                                    <button className={styles['search-page__retry']} onClick={() => window.location.reload()}>Retry</button>
                                </div>
                            ) : (
                                artists.map((artist) => (
                                    <ArtistCard
                                        key={artist.mbid || artist.name}
                                        name={artist.name}
                                        imageUrl={artist.image?.[2]?.['#text'] || ''}
                                    />
                                ))
                            )}
                        </div>
                    )}
                    {tab === 'albums' && (
                        <div className={styles['search-page__albums-grid']}>
                            {albumsLoading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <div className={styles['search-page__album-loading']} key={i} />
                                ))
                            ) : albumsError ? (
                                <div className={styles['search-page__error']}>
                                    {albumsError}
                                    <button className={styles['search-page__retry']} onClick={() => window.location.reload()}>Retry</button>
                                </div>
                            ) : (
                                albums.map((album) => (
                                    <AlbumCard
                                        key={album.mbid || album.name + album.artist}
                                        title={album.name}
                                        artist={album.artist}
                                        imageUrl={album.image?.[2]?.['#text'] || ''}
                                    />
                                ))
                            )}
                        </div>
                    )}
                    {tab === 'tracks' && (
                        <div className={styles['search-page__tracks-table']}>
                            {tracksLoading ? (
                                <div className={styles['search-page__tracks-loading']} />
                            ) : tracksError ? (
                                <div className={styles['search-page__error']}>
                                    {tracksError}
                                    <button className={styles['search-page__retry']} onClick={() => window.location.reload()}>Retry</button>
                                </div>
                            ) : (
                                <TrackTable tracks={tracks} />
                            )}
                        </div>
                    )}
                    {tab === 'overview' && (
                        <div className={styles['search-page__overview']}>
                            {overviewLoading ? (
                                <div className={styles['search-page__overview-loading']} />
                            ) : overviewError ? (
                                <div className={styles['search-page__error']}>
                                    {overviewError}
                                    <button className={styles['search-page__retry']} onClick={() => window.location.reload()}>Retry</button>
                                </div>
                            ) : (
                                <>
                                    <div className={styles['search-page__overview-section']}>
                                        <div className={styles['search-page__overview-title']}>Top Artists</div>
                                        <div className={styles['search-page__overview-artists']}>
                                            {overview.artists.map((artist) => (
                                                <ArtistCard
                                                    key={artist.mbid || artist.name}
                                                    name={artist.name}
                                                    imageUrl={artist.image?.[2]?.['#text'] || ''}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles['search-page__overview-section']}>
                                        <div className={styles['search-page__overview-title']}>Top Albums</div>
                                        <div className={styles['search-page__overview-albums']}>
                                            {overview.albums.map((album) => (
                                                <AlbumCard
                                                    key={album.mbid || album.name + album.artist}
                                                    title={album.name}
                                                    artist={album.artist}
                                                    imageUrl={album.image?.[2]?.['#text'] || ''}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles['search-page__overview-section']}>
                                        <div className={styles['search-page__overview-title']}>Top Tracks</div>
                                        <ul className={styles['search-page__overview-tracks']}>
                                            {overview.tracks.map((track) => (
                                                <li key={track.mbid || track.name + track.artist}>
                                                    <a className={styles['search-page__overview-track-link']} href={`/track/${track.mbid || encodeURIComponent(track.name)}`}>{track.name} <span className={styles['search-page__overview-track-artist']}>by {track.artist}</span></a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default SearchPage; 