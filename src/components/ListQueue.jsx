import LibrarySong from "./LibrarySong";

export default function ListQueue({
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
}) {
    return (
        <>
            <h2>Queue</h2>
            <div className="list_songs">
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
                    />
                ))}
            </div>
        </>
    );
}
