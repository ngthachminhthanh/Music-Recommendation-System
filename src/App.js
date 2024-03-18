import { useState, useRef } from "react";
import "./styles/app.scss";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import List from "./components/List";
import Nav from "./components/Nav";
import data from "./data";

function App() {
    // console.log("Re-render from App.js")

    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [libraryStatus, setLibraryStatus] = useState(false);
    const [listStatus, setListStatus] = useState(false)
    const [listQueue, setListQueue] = useState([]);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [darkTheme, setDarkTheme] = useState(false);
    const audioRef = useRef(null);

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrentTime = Math.round(currentTime);
        const roundedDuration = Math.round(duration);
        const animationPercentage = Math.round(
            (roundedCurrentTime / roundedDuration) * 100
        );

        setSongInfo({
            ...songInfo,
            currentTime,
            duration,
            animationPercentage,
        });
    };

    const songEndHandler = async () => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
    };

    const darkThemeHandler = () => {
        if (darkTheme === false) {
            setDarkTheme(true);
        } else {
            setDarkTheme(false);
        }
    };

    return (
        <div
            className={`App 
                        ${libraryStatus ? "library_active" : ""} 
                        ${darkTheme ? "dark" : ""}
                        ${listStatus ? "list_active" : ""}`}
        >
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
                listStatus={listStatus}
                setListStatus={setListStatus}
                darkTheme={darkTheme}
                setDarkTheme={setDarkTheme}
                darkThemeHandler={darkThemeHandler}
            />
            <Song currentSong={currentSong} songInfo={songInfo} />
            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                audioRef={audioRef}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
            />
            <Library
                libraryStatus={libraryStatus}
                isPlaying={isPlaying}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                songs={songs}
                setSongs={setSongs}
                listQueue={listQueue}
                setListQueue={setListQueue}
                typeOfButton={"faPlus"}
            />
            <List
                listStatus={listStatus}
                isPlaying={isPlaying}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                songs={songs}
                setSongs={setSongs}
                listQueue={listQueue}
                setListQueue={setListQueue}
            />
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}

export default App;
