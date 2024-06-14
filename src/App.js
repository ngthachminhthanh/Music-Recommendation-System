import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "./styles/app.scss";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import List from "./components/List";
import Nav from "./components/Nav";
import SongManagement from "./components/SongManagement"; 

function App({ initialSongs }) {
    const [songs, setSongs] = useState(initialSongs);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const width = window.innerWidth;    
    const notPhone = width > 720 ? true: false;

    const [libraryStatus, setLibraryStatus] = useState(notPhone);
    const [listStatus, setListStatus] = useState(false);
    const [listQueue, setListQueue] = useState([]);
    const [listRecommend, setListRecommend] = useState([]);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [darkTheme, setDarkTheme] = useState(false);
    const audioRef = useRef(null);
    const [ back, setBack ] = useState(true);

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

    const activeLibraryHandler = (nextPrev) => {
        const activeSong = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return { ...song, active: true };
            } else {
                return { ...song, active: false };
            }
        });
        setSongs(activeSong);
    };

    const songEndHandler = async () => {
        if (listQueue.length !== 0) {
            let currentIndex = listQueue.findIndex(
                (lq) => lq.id === currentSong.id
            );
            await setCurrentSong(listQueue[(currentIndex + 1) % listQueue.length]);
            activeLibraryHandler(listQueue[(currentIndex + 1) % listQueue.length]);
        } else {
            let currentIndex = songs.findIndex(
                (song) => song.id === currentSong.id
            );
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }

        if (isPlaying) audioRef.current.play();
    };

    const darkThemeHandler = () => {
        setDarkTheme(!darkTheme);
    };

    return (
        <Router>
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
                    back={back}
                    setBack={setBack}
                />
                <Routes>
                    <Route path="/" element={ back ? 
                        <>
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
                                listRecommend={listRecommend}
                                setListRecommend={setListRecommend}
                                typeOfButton={"faPlus"}
                            />
                            <audio
                                onTimeUpdate={timeUpdateHandler}
                                onLoadedMetadata={timeUpdateHandler}
                                ref={audioRef}
                                src={currentSong?.audio}
                                onEnded={songEndHandler}
                            ></audio>
                        </> : <></>
                    } />
                    <Route path="/manage" element={ back ? <></> : <SongManagement songs={songs} setSongs={setSongs} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
