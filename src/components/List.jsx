import ListQueue from "./ListQueue";
import ListRecommend from "./ListRecommend";

export default function List({
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    audioRef,
    isPlaying,
    listStatus,
    listQueue,
    setListQueue,
    listRecommend,
    setListRecommend,
    typeOfButton,
    user,
    playList,
    setPlayList
}) {
    return (
        <div className={`list ${listStatus ? "active_list" : ""}`}>
            <ListQueue
                songs={songs}
                setSongs={setSongs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                listQueue={listQueue}
                setListQueue={setListQueue}
                listRecommend={listRecommend}
                setListRecommend={setListRecommend}
                user={user}
                playList={playList}
                setPlayList={setPlayList}
            />
            <ListRecommend
                songs={songs}
                setSongs={setSongs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                listQueue={listQueue}
                setListQueue={setListQueue}
                listRecommend={listRecommend}
                setListRecommend={setListRecommend}
                typeOfButton={typeOfButton}
            />
        </div>
    );
}
