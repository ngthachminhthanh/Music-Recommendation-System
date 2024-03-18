import LibrarySong from "./LibrarySong";

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
    // console.log("Re-render from Library.jsx")
    return (
        <div className={`library ${libraryStatus ? "active_library" : ""}`}>
            <h2>Library</h2>
            <div className="library_songs">
                {songs.map((song) => (
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
