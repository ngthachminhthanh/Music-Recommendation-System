import React, { useState, useEffect } from 'react';
import { getAllMusic } from './firebaseServices'; 
import App from './App';

const DataLoader = () => {
    const [songs, setSongs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const musicData = await getAllMusic();
            setSongs(musicData);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);
    
    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className='circle'></div>
                <div className="loading-text">Loading...</div>
            </div>
        </div>
    );

    if (!songs) return <div>Error loading data</div>;

    return <App initialSongs={songs} />;
};

export default DataLoader;