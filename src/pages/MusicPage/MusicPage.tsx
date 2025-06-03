import React from 'react';
import styles from './MusicPage.module.css';
import Header from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';
import HotNow from '../../widgets/HotNow/HotNow';
import PopularTracks from '../../widgets/PopularTracks/PopularTracks';

/**
 * MusicPage - main music landing page.
 * @returns {JSX.Element}
 */
const MusicPage: React.FC = () => {
    return (
        <div className={styles['music-page']}>
            <Header />
            <main className={styles['music-page__main']}>
                <HotNow />
                <PopularTracks />
                {/* TODO: Add PopularTracks widget here */}
            </main>
            <Footer />
        </div>
    );
};

export default MusicPage; 