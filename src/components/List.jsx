import ListQueue from "./ListQueue";
import ListRecommend from "./ListRecommend";

export default function List({
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
    listStatus,
}) {
    return (
        <div className={`list ${listStatus ? "active_list" : ""}`}>
            <ListQueue
                songs={songs}
                setSongs={setSongs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
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
