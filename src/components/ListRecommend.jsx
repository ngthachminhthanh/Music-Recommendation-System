import LibrarySong from "./LibrarySong";

export default function ListRecommend({
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    audioRef,
    isPlaying,
    listStatus,
    listQueue,
    setListQueue,
    typeOfButton,
}) {
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
                        typeOfButton={typeOfButton}
                        listQueue={listQueue}
                        setListQueue={setListQueue}
                    />
                ))}
            </div>
        </>
    );
}
