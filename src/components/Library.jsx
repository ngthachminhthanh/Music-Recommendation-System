import React, { useState } from "react";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Library({
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
    libraryStatus,
    listQueue,
    setListQueue,
    typeOfButton
}) {
    const [searchTerm, setSearchTerm] = useState("");

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
                    <button className="b3" style={{
                        padding: 10,
                        margin: '0 8px',
                        borderRadius: 10,
                        cursor: 'pointer',
                        fontWeight: 550
                    }}>Bài hát</button>
                    <button className="b3" style={{
                        padding: 10,
                        margin: '0 8px',
                        borderRadius: 10,
                        cursor: 'pointer',
                        fontWeight: 550
                    }}>Nghệ sĩ</button>
                    <button className="b3" style={{
                        padding: 10,
                        margin: '0 8px',
                        borderRadius: 10,
                        cursor: 'pointer',
                        fontWeight: 550
                    }}>Playlist</button>
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
                {filteredSongs.map((song) => (
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
            </div>
        </div>
    );
}
