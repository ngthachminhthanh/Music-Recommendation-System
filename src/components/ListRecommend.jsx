import LibrarySong from "./LibrarySong";

export default function ListRecommend({
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
}) {
    // console.log("Re-render from ListRecommend.js")
    return (
        <>
            <h2>Recommend</h2>
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
