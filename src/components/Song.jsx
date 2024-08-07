import { memo } from "react";

const Song = ({ currentSong, songInfo }) => {
    const songAnimation = {
        transform: `rotate(${songInfo.currentTime * 10}deg)`,
    };

    return (
        <div className="song_container">
            <img
                src={currentSong?.cover}
                alt={currentSong?.name}
                style={songAnimation}
            />
            <div>
                <h2>{currentSong?.name}</h2>
                <h3>{currentSong?.artist}</h3>
            </div>
        </div>
    );
}

export default memo(Song);