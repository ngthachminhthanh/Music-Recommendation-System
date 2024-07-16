import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";

const AboutPlaylist = ({ playlist, songs, setCurrentSong, isPlaying, audioRef, setSongs, listQueue, setListQueue, typeOfButton }) => {
    const playlistSongs = playlist.songs || [];

    const playAllSongs = () => {
        setListQueue(playlistSongs);
        setCurrentSong(playlistSongs[0]);
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const addToQueue = (song) => (event) => {
        const isSongInQueue = listQueue.some((queueSong) => queueSong.id === song.id);
        if (!isSongInQueue) {
            setListQueue([...listQueue, {...song, active: false}]);
        }
        event.stopPropagation();
    }

    return (
        <div className="about-playlist" style={{ 
            padding: '20px', 
            color: 'white', 
            background: 'linear-gradient(to bottom, #1e3a8a, #0f172a)', 
            margin: '0 13px', 
            height: '530px', 
            display: 'flex', 
            flexDirection: 'column'
        }}>
            <div style={{ flex: '0 0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '30px' }}>
                    <img src={playlist.cover} alt={playlist.name} style={{ width: '180px', height: '180px', marginRight: '20px' }} />
                    <div>
                        <h4 style={{ margin: '0', fontSize: '16px', color: 'white' }}>Playlist</h4>
                        <h1 style={{ margin: '10px 0', fontSize: '72px', fontWeight: 'bold', color: 'white' }}>{playlist.name}</h1>
                        <p style={{ margin: '0', fontSize: '14px' }}>{playlistSongs.length} bài hát • Tổng thời lượng: {Math.floor(playlistSongs.reduce((acc, song) => acc + song.duration, 0) / 60)} phút {playlistSongs.reduce((acc, song) => acc + song.duration, 0) % 60} giây</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={playAllSongs} style={{ background: '#1DB954', border: 'none', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faPlay} style={{ color: 'white', fontSize: '24px' }} />
                    </button>
                </div>
            </div>
            <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, background: '#0f172a' }}>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ textAlign: 'left', padding: '10px', width: '40px' }}>#</th>
                            <th style={{ textAlign: 'left', padding: '10px' }}>Tên bài hát</th>
                            <th style={{ textAlign: 'right', padding: '10px', width: '110px' }}>Thời lượng</th>
                            <th style={{ textAlign: 'right', padding: '10px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistSongs.map((song, index) => (
                            <tr key={song.id} className='bgHover' style={{ cursor: 'pointer' }} onClick={() => setCurrentSong(song)}>
                                <td style={{ padding: '10px' }}>{index + 1}</td>
                                <td style={{ padding: '10px' }}>{song.name}</td>
                                <td style={{ textAlign: 'right', padding: '10px' }}>{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</td>
                                <td style={{ textAlign: 'right', padding: '10px' }}>
                                    <button className='iconAddToQueueFromAboutPlaylist' onClick={addToQueue(song)}>
                                        <FontAwesomeIcon id="icon" icon={faPlus} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AboutPlaylist;