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
    setListQueue
}) {
    // console.log("Re-render from List.jsx")
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
            />
            <ListRecommend
                songs={songs}
                setSongs={setSongs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
            />
        </div>
    );
}
