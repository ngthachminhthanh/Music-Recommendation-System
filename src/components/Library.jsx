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
            <h2>Library</h2>
            <div style={{
                paddingBottom: 24,
                textAlign: "center"
            }}>
                <FontAwesomeIcon icon={faSearch} style={{ width: 22, height: 22 }} />
                <input 
                    style={{
                        marginLeft: 10,
                        padding: 10,
                        borderRadius: 10,
                        width: "60%"
                    }}
                    type="text" 
                    placeholder="Search songs or artists..."
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
