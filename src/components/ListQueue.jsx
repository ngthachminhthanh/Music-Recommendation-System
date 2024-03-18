import LibrarySong from "./LibrarySong";

export default function ListQueue({
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    audioRef,
    isPlaying,
    listQueue,
    setListQueue
}) {
    // console.log("Re-render from ListQueue.js")
    return (
        <>
            <h2>Queue</h2>
            <div className="list_songs">
                {
                    listQueue.map((song) => (
                    <LibrarySong
                        listQueue={listQueue}
                        setListQueue={setListQueue}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        song={song}
                        setSongs={setSongs}
                        songs={songs}
                        id={song.id}
                        key={song.id}
                        isPlaying={isPlaying}
                        audioRef={audioRef}
                        typeOfButton={"faMinus"}
                    />
                ))}
            </div>
        </>
    );
}
