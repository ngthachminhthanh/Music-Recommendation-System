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
            <h2>Danh sách đợi phát</h2>
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
                            color: '#454545'
                        }}>
                            Bạn chưa thêm bài hát nào vào hàng đợi
                        </p>
                    )
                }
            </div>
        </>
    );
}
