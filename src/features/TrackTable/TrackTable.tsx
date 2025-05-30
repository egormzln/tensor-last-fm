import React from 'react';
import styles from './TrackTable.module.css';

interface Track {
    name: string;
    artist: { name: string } | string;
    duration?: string;
    mbid?: string;
    url?: string;
}

interface TrackTableProps {
    tracks: Track[];
}

/**
 * TrackTable - displays a table of tracks with clickable rows.
 * @param {TrackTableProps} props
 * @returns {JSX.Element}
 */
const TrackTable: React.FC<TrackTableProps> = ({ tracks }) => {
    const getDuration = (duration: string | undefined) => {
        if (!duration || isNaN(Number(duration))) return '-';
        const sec = Number(duration);
        const min = Math.floor(sec / 60);
        const s = sec % 60;
        return `${min}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <table className={styles['track-table']}>
            <thead>
                <tr>
                    <th className={styles['track-table__col']}>#</th>
                    <th className={styles['track-table__col']}>Title</th>
                    <th className={styles['track-table__col']}>Artist</th>
                    <th className={styles['track-table__col']}>Duration</th>
                </tr>
            </thead>
            <tbody>
                {tracks.map((track, i) => (
                    <tr
                        className={styles['track-table__row']}
                        key={track.mbid || track.name + (typeof track.artist === 'string' ? track.artist : track.artist.name)}
                        tabIndex={0}
                        onClick={() => {
                            window.location.href = `/track/${track.mbid || encodeURIComponent(track.name)}`;
                        }}
                    >
                        <td className={styles['track-table__cell']}>{i + 1}</td>
                        <td className={styles['track-table__cell']}>{track.name}</td>
                        <td className={styles['track-table__cell']}>
                            {typeof track.artist === 'string' ? track.artist : track.artist.name}
                        </td>
                        <td className={styles['track-table__cell']}>{getDuration(track.duration)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TrackTable; 