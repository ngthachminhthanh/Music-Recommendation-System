import React, { useEffect, useMemo, useState } from 'react';

export default function MainContent({ user, songs, setCurrentSong, audioRef, isPlaying, listQueue, setListQueue }) {
    const [selectedArtist, setSelectedArtist] = useState(null);

    // Memoize artists to prevent unnecessary re-rendering
    const randomArtists = useMemo(() => {
        const uniqueArtists = Array.from(new Set(songs.map(song => song.artist)))
            .map(artist => {
                const song = songs.find(song => song.artist === artist);
                return { artist, cover: song.cover };
            });
        return uniqueArtists.sort(() => 0.5 - Math.random()).slice(0, 4);
    }, [songs]);

    const topArtists = useMemo(() => {
        if (user) {
            const artistCount = {};
            songs.forEach(song => {
                if (artistCount[song.artist]) {
                    artistCount[song.artist]++;
                } else {
                    artistCount[song.artist] = 1;
                }
            });

            const sortedArtists = Object.keys(artistCount).sort((a, b) => artistCount[b] - artistCount[a]);
            return sortedArtists.slice(0, 4).map(artist => {
                const song = songs.find(song => song.artist === artist);
                return { artist, cover: song.cover };
            });
        }
        return [];
    }, [songs, user]);

    const randomSongs = useMemo(() => {
        return [...songs].sort(() => 0.5 - Math.random()).slice(0, 10); // Increased to 10
    }, [songs]);

    // Filter songs by selected artist
    const filteredSongs = useMemo(() => {
        return selectedArtist
            ? songs.filter(song => song.artist === selectedArtist).slice(0, 5) // Limit to 5 songs
            : [];
    }, [selectedArtist, songs]);

    // Separate selected artist from others
    const filteredRandomArtists = useMemo(() => {
        return randomArtists.filter(artist => artist.artist !== selectedArtist);
    }, [randomArtists, selectedArtist]);

    const selectedArtistInRandom = useMemo(() => {
        return randomArtists.find(artist => artist.artist === selectedArtist);
    }, [randomArtists, selectedArtist]);

    const filteredTopArtists = useMemo(() => {
        return topArtists.filter(artist => artist.artist !== selectedArtist);
    }, [topArtists, selectedArtist]);

    const selectedArtistInTop = useMemo(() => {
        return topArtists.find(artist => artist.artist === selectedArtist);
    }, [topArtists, selectedArtist]);

    return (
        <div style={{
            width: '97.25%',
            height: '74.3vh',
            paddingLeft: 90,
            marginLeft: '12.75px',
            background: 'linear-gradient(rgb(100 213 169) 0%, #65b9e6 100%)',
            overflow: 'scroll',
            overflowX: 'hidden',
        }}>
            <div style={{ paddingBottom: 16 }}>
                <h2>Nghệ sĩ bạn có thể thích</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 18 }}>
                    {filteredRandomArtists.map((artist, index) => (
                        <div key={index} style={{ padding: '0 20px 10px', textAlign: 'center' }}>
                            <img
                                src={artist.cover}
                                alt={artist.artist}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: '50%',
                                    border: 'solid #333',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedArtist(selectedArtist === artist.artist ? null : artist.artist)}
                            />
                            <h3>{artist.artist}</h3>
                        </div>
                    ))}
                    {selectedArtistInRandom && (
                        <div key={selectedArtistInRandom.artist} style={{ padding: '0 20px 10px', textAlign: 'center' }}>
                            <img
                                src={selectedArtistInRandom.cover}
                                alt={selectedArtistInRandom.artist}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: '50%',
                                    border: 'solid #333',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedArtist(selectedArtistInRandom.artist === selectedArtist ? null : selectedArtistInRandom.artist)}
                            />
                            <h3>{selectedArtistInRandom.artist}</h3>
                            <div style={{ paddingTop: 16, textAlign: 'center' }}>
                                <h2>Bài hát của {selectedArtistInRandom.artist}</h2>
                                <div style={{ display: 'flex', flexWrap: 'nowrap', paddingTop: 18, overflowX: 'scroll' }}>
                                    {filteredSongs.map((song) => (
                                        <div key={song.id} style={{ padding: '0 10px', textAlign: 'center' }}>
                                            <div
                                                onClick={() => {
                                                    setCurrentSong(song);
                                                    if (isPlaying) {
                                                        audioRef.current.play();
                                                    }
                                                }}
                                                style={{
                                                    cursor: 'pointer',
                                                    width: '100px',
                                                    height: '100px',
                                                    background: `url(${song.cover}) center center/cover`,
                                                    borderRadius: '10px',
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                                                }}
                                            ></div>
                                            <h4 style={{
                                                margin: '10px 0 5px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '100px'
                                            }}>{song.name}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {user && (
                <div style={{ paddingBottom: 16 }}>
                    <h2>Nghệ sĩ được nghe nhiều nhất</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 18 }}>
                        {filteredTopArtists.map((artist, index) => (
                            <div key={index} style={{ padding: '0 20px 10px', textAlign: 'center' }}>
                                <img
                                    src={artist.cover}
                                    alt={artist.artist}
                                    style={{
                                        width: 140,
                                        height: 140,
                                        borderRadius: '50%',
                                        border: 'solid #333',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setSelectedArtist(selectedArtist === artist.artist ? null : artist.artist)}
                                />
                                <h3>{artist.artist}</h3>
                            </div>
                        ))}
                        {selectedArtistInTop && (
                            <div key={selectedArtistInTop.artist} style={{ padding: '0 20px 10px', textAlign: 'center' }}>
                                <img
                                    src={selectedArtistInTop.cover}
                                    alt={selectedArtistInTop.artist}
                                    style={{
                                        width: 140,
                                        height: 140,
                                        borderRadius: '50%',
                                        border: 'solid #333',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setSelectedArtist(selectedArtistInTop.artist === selectedArtist ? null : selectedArtistInTop.artist)}
                                />
                                <h3>{selectedArtistInTop.artist}</h3>
                                <div style={{ paddingTop: 16, textAlign: 'center' }}>
                                    <h2>Bài hát của {selectedArtistInTop.artist}</h2>
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', paddingTop: 18, overflowX: 'scroll' }}>
                                        {filteredSongs.map((song) => (
                                            <div key={song.id} style={{ padding: '0 10px', textAlign: 'center' }}>
                                                <div
                                                    onClick={() => {
                                                        setCurrentSong(song);
                                                        if (isPlaying) {
                                                            audioRef.current.play();
                                                        }
                                                    }}
                                                    style={{
                                                        cursor: 'pointer',
                                                        width: '100px',
                                                        height: '100px',
                                                        background: `url(${song.cover}) center center/cover`,
                                                        borderRadius: '10px',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                                                    }}
                                                ></div>
                                                <h4 style={{
                                                    margin: '10px 0 5px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    width: '100px'
                                                }}>{song.name}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div style={{ paddingBottom: 16 }}>
                <h2>Hôm nay bạn có thể muốn nghe</h2>
                <div style={{ display: 'flex', flexWrap: 'nowrap', paddingTop: 18, overflowX: 'scroll' }}>
                    {randomSongs.map((song) => (
                        <div key={song.id} style={{ padding: '0 10px', textAlign: 'center' }}>
                            <div
                                onClick={() => {
                                    setCurrentSong(song);
                                    if (isPlaying) {
                                        audioRef.current.play();
                                    }
                                }}
                                style={{
                                    cursor: 'pointer',
                                    width: '120px',
                                    height: '120px',
                                    background: `url(${song.cover}) center center/cover`,
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                                }}
                            ></div>
                            <h4 style={{
                                margin: '10px 0 5px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '120px'
                            }}>{song.name}</h4>
                            <p style={{ margin: 0 }}>{song.artist}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
