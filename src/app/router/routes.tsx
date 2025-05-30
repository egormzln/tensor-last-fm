import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const MusicPage = lazy(() => import('../../pages/MusicPage'));
const SearchPage = lazy(() => import('../../pages/SearchPage'));
const ArtistPage = lazy(() => import('../../pages/ArtistPage'));
const TrackPage = lazy(() => import('../../pages/TrackPage'));

const LivePage = () => <div>Live Page (Coming Soon)</div>;
const ChartsPage = () => <div>Charts Page (Coming Soon)</div>;
const EventsPage = () => <div>Events Page (Coming Soon)</div>;
const FeaturesPage = () => <div>Features Page (Coming Soon)</div>;

/**
 * AppRoutes component for main routing.
 * @returns {JSX.Element}
 */
export const AppRoutes: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<MusicPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/artist/:artistName" element={<ArtistPage />} />
            <Route path="/track/:trackId" element={<TrackPage />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Suspense>
); 