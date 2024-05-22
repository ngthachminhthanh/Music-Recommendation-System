import LibrarySong from "./LibrarySong";

export default function ListQueue({
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    audioRef,
    isPlaying,
    listQueue,
    setListQueue,
    listRecommend,
    setListRecommend
}) {
    return (
        <>
            <h2>Queue</h2>
            <div className="list_songs" style={ listQueue.length == 0 ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            } : null }>
                {
                    listQueue.length !== 0 ? listQueue.map((song) => (
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
                    )) : (
                        <p style={{
                            color: 'gray'
                        }}>
                            You haven't add any songs yet to queue
                        </p>
                    )
                }
            </div>
        </>
    );
}
