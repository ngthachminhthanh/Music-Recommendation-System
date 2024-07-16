import { useState, useCallback, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.scss";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import List from "./components/List";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import MainContent from "./components/MainContent";
import SongManagement from "./components/SongManagement";
import { getAllMusic } from "./firebaseServices";

function App({ initialSongs }) {
    const [songs, setSongs] = useState(initialSongs);

    const refreshSongs = useCallback(async () => {
        try {
            const updatedSongs = await getAllMusic();
            setSongs(updatedSongs);
        } catch (error) {
            console.error("Error refreshing songs: ", error);
            alert("An error occurred while refreshing songs. Please try again.");
        }
    }, [setSongs]);

    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const [libraryStatus, setLibraryStatus] = useState(true);
    const [listStatus, setListStatus] = useState(true);
    const [listQueue, setListQueue] = useState([]);
    const [listRecommend, setListRecommend] = useState([]);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [darkTheme, setDarkTheme] = useState(false);
    const audioRef = useRef(null);
    const [back, setBack] = useState(true);

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

    const [showNav, setShowNav] = useState(true);
    const [user, setUser] = useState(null);
    const [playList, setPlayList] = useState([]);

    return (
        <Router>
            <div
                className={`App 
                    ${showNav ? "library_active" : ""} 
                    ${darkTheme ? "dark" : ""}
                    ${showNav ? "list_active" : ""}`}
            >
                {showNav &&
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
                        setShowNav={setShowNav}
                        user={user}
                        setUser={setUser}
                    />
                }

                <Routes>
                    <Route path="/" element={back ?
                        <>
                            <div style={{
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                background: 'black',
                                width: '100%',
                            }}>
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
                            </div>
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
                                user={user}
                                playList={playList}
                                setPlayList={setPlayList}
                            />
                            <MainContent user={user} songs={songs} />
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
                                user={user}
                                playList={playList}
                                setPlayList={setPlayList}
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
                    <Route path="/login" element={<Login setShowNav={setShowNav} />} />
                    <Route path="/signup" element={<Signup setShowNav={setShowNav} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
