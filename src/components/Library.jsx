import React, { useState, useEffect } from "react";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default function Library({
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
    libraryStatus,
    listQueue,
    setListQueue,
    typeOfButton,
    user
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeButton, setActiveButton] = useState("Bài hát");

    const uniqueArtists = Array.from(
        songs.reduce((map, song) => {
            if (!map.has(song.artist)) {
                map.set(song.artist, { artist: song.artist, cover: song.cover });
            }
            return map;
        }, new Map()).values()
    );

    const [playList, setPlayList] = useState([]);
    useEffect(() => {
        const fetchPlaylists = async () => {
            if (user && user.username) {
                try {
                    const usersRef = collection(db, 'users');
                    const q = query(usersRef, where("username", "==", user.username));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        const userData = userDoc.data();
                        if (userData.playlists) {
                            setPlayList(userData.playlists);
                        } else {
                            setPlayList([]);
                        }
                    } else {
                        setPlayList([]);
                    }
                } catch (error) {
                    console.error("Error fetching playlists: ", error);
                    setPlayList([]);
                }
            } else {
                setPlayList([]);
            }
        };

        fetchPlaylists();
    }, [user]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSongs = searchTerm
        ? songs.filter((song) => {
            const songName = song.name.toLowerCase();
            const songArtist = song.artist.toLowerCase();
            const search = searchTerm.toLowerCase();
            return songName.includes(search) || songArtist.includes(search);
          })
        : songs; 

    const buttonStyle = (buttonName) => ({
        padding: 10,
        margin: '0 8px',
        borderRadius: 10,
        cursor: 'pointer',
        fontWeight: 550,
        backgroundColor: activeButton === buttonName ? 'black' : 'white',
        color: activeButton === buttonName ? 'white' : 'black',
    });

    return (
        <div className={`library ${libraryStatus ? "active_library" : ""}`}>
            <h2>Danh sách bài hát </h2>
            <div style={{
                paddingBottom: 24,
                textAlign: "center"
            }}>
                <div style={{
                    paddingBottom: 18
                }}>
                    <button 
                        className="b3" 
                        style={buttonStyle("Bài hát")}
                        onClick={() => setActiveButton("Bài hát")}
                    >
                        Bài hát
                    </button>
                    <button 
                        className="b3" 
                        style={buttonStyle("Nghệ sĩ")}
                        onClick={() => setActiveButton("Nghệ sĩ")}
                    >
                        Nghệ sĩ
                    </button>
                    <button 
                        className="b3" 
                        style={buttonStyle("Playlist")}
                        onClick={() => setActiveButton("Playlist")}
                    >
                        Playlist
                    </button>
                </div>
                <FontAwesomeIcon icon={faSearch} style={{ width: 22, height: 22 }} />
                <input 
                    style={{
                        marginLeft: 10,
                        padding: 10,
                        borderRadius: 10,
                        width: "60%"
                    }}
                    type="text" 
                    placeholder="Nhập tên bài hát/nghệ sĩ..."
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                />
            </div>
            <div className="library_songs">
                {activeButton === "Bài hát" && filteredSongs.map((song) => (
                    <LibrarySong
                        setCurrentSong={setCurrentSong}
                        song={song}
                        setSongs={setSongs}
                        songs={songs}
                        id={song.id}
                        key={song.id}
                        isPlaying={isPlaying}
                        audioRef={audioRef}
                        listQueue={listQueue}
                        setListQueue={setListQueue}
                        typeOfButton={typeOfButton}
                    />
                ))}
                {activeButton === "Nghệ sĩ" && uniqueArtists.map((artist, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '12px 30px' }}>
                        <img 
                            src={artist.cover} 
                            alt={artist.artist} 
                            style={{ width: '74px', height: '74px', marginRight: '12px', borderRadius: 6, border: 'solid #333' }}
                        />
                        <span>{artist.artist}</span>
                    </div>
                ))}
                {activeButton === "Playlist" && (
                    playList.length > 0 ? (
                        playList.map((playlist, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '12px 30px' }}>
                                <img 
                                    src={"https://accucut.com/cdn/shop/products/ZM1650.jpg?v=1575932437"} 
                                    style={{ width: '74px', height: '74px', marginRight: '12px', borderRadius: 6, border: 'solid #333' }}
                                />
                                <h3>{playlist.playlistName}</h3>
                            </div>
                        ))
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70%', flexDirection: 'column' }}>
                            <p>Hiện không có Playlist nào...</p>
                            <p>Hãy đăng nhập và tạo Playlist cho riêng bạn!</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}