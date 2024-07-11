import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function LibrarySong({
    song,
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    listQueue,
    setListQueue,
    id,
    audioRef,
    isPlaying,
    typeOfButton
}) {
    useEffect(() => {
        if(listQueue !== undefined) {
            listQueue.map((lq) => {
                const correspondingInSongs = songs.find((s) => s.name === lq.name)
                if(correspondingInSongs) {
                    lq.active = correspondingInSongs.active
                }
            })
        }
    }, [songs])
    
    const songSelectHandler = async () => {
        await setCurrentSong(song);

        const activeSong = songs.map((song) => {
            if (song.id === id) {
                return { ...song, active: true };
            } else {
                return { ...song, active: false };
            }
        });
        setSongs(activeSong);

        if (isPlaying) audioRef.current.play();
    };

    const addToQueue = (event) => {
        const isSongInQueue = listQueue.some((queueSong) => queueSong.id === song.id);
        if (!isSongInQueue) {
            setListQueue([...listQueue, {...song, active: false}]);
        }
        event.stopPropagation();
        alert("Đã thêm bài hát vào hàng đợi!");
    }

    const removeFromQueue = (event) => {
        if(listQueue !== undefined) {
            const updatedListQueue = listQueue.filter((queueSong) => queueSong.id !== song.id);
            setListQueue(updatedListQueue);
        }
        event.stopPropagation();
    }

    return (
        <div
            onClick={songSelectHandler}
            className={`library_song ${song.active ? "selected_song" : ""}`}
        >
            <img src={song.cover} alt={song.name} />
            <div className="song_description">
                    <h4>{song.name}</h4>
                    <h6>{song.artist}</h6>
            </div>
            { typeOfButton && (
                <button onClick={typeOfButton === "faPlus" ? addToQueue : removeFromQueue}>
                    <FontAwesomeIcon id="icon" icon={typeOfButton === "faPlus" ? faPlus : faMinus} />
                </button>
            )} 
        </div>
    );
}
