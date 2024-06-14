import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; 

const SongManagement = ({ songs, setSongs }) => {
    const [mode, setMode] = useState("view");
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [songData, setSongData] = useState({});

    const handleAddSong = () => {
        setMode("add");
        setSongData({
            id: uuidv4(),
            name: "",
            artist: "",
            genre: "",
            album: "",
            // Add default values for other fields
        });
    };

    const handleUpdateSong = () => {
        setMode("update");
        setSelectedSongId(null);
        setSongData({});
    };

    const handleDeleteSong = () => {
        setMode("delete");
        setSelectedSongId(null);
    };

    const handleCancel = () => {
        setMode("view");
    };

    const handleConfirm = () => {
        let confirmationMessage;
        if (mode === "add") {
            confirmationMessage = "Are you sure you want to add this song?";
        } else if (mode === "update" && selectedSongId !== null) {
            confirmationMessage = "Are you sure you want to update this song?";
        } else if (mode === "delete" && selectedSongId !== null) {
            confirmationMessage = "Are you sure you want to delete this song?";
        }
    
        if (window.confirm(confirmationMessage)) {
            if (mode === "add") {
                setSongs([...songs, songData]);
            } else if (mode === "update" && selectedSongId !== null) {
                const updatedSongs = songs.map(song =>
                    song.id === selectedSongId ? { ...song, ...songData } : song
                );
                setSongs(updatedSongs);
            } else if (mode === "delete" && selectedSongId !== null) {
                const filteredSongs = songs.filter(song => song.id !== selectedSongId);
                setSongs(filteredSongs);
            }
            setMode("view");
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSongData({
            ...songData,
            [name]: value
        });
    };

    const handleSelectSong = (e) => {
        const songId = e.target.value;
        const selectedSong = songs.find(song => song.id === songId);
        setSelectedSongId(songId);
        setSongData(selectedSong || {});
    };

    return (
        <div style={{
            textAlign: "center",
        }}>
            <h2 style={{ margin: 30 }}>Manage Songs</h2>
            {mode === "view" ? (
                <div>
                    <button style={{ padding: 24, margin: 24, borderRadius: 10, cursor: "pointer", fontSize: 16, boxShadow: "2px 2px 10px 0px white" }} onClick={handleAddSong}>Add New Song</button>
                    <button style={{ padding: 24, margin: 24, borderRadius: 10, cursor: "pointer", fontSize: 16, boxShadow: "2px 2px 10px 0px white" }} onClick={handleUpdateSong}>Update Song</button>
                    <button style={{ padding: 24, margin: 24, borderRadius: 10, cursor: "pointer", fontSize: 16, boxShadow: "2px 2px 10px 0px white" }} onClick={handleDeleteSong}>Delete Song</button>
                </div>
            ) : (
                <div>
                    {mode === "add" && (
                        <form style={{ padding: 20, margin: 20 }}>
                            <h3 style={{ paddingBottom: 20 }}>Add New Song</h3>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%", 
                                textOverflow: "ellipsis", 
                                overflow: "hidden", 
                                whiteSpace: "nowrap" 
                            }}>
                                <div>
                                    <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
                                        <label style={{ flex: "0 0 100px", textAlign: "left" }}>Song Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={songData.name}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, marginLeft: 10, width: "300px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
                                        <label style={{ flex: "0 0 100px", textAlign: "left" }}>Artist:</label>
                                        <input
                                            type="text"
                                            name="artist"
                                            value={songData.artist}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, marginLeft: 10, width: "300px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
                                        <label style={{ flex: "0 0 100px", textAlign: "left" }}>Genre:</label>
                                        <input
                                            type="text"
                                            name="genre"
                                            value={songData.genre}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, marginLeft: 10, width: "300px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
                                        <label style={{ flex: "0 0 100px", textAlign: "left" }}>Album:</label>
                                        <input
                                            type="text"
                                            name="album"
                                            value={songData.album}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, marginLeft: 10, width: "300px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
                                        <label style={{ flex: "0 0 100px", textAlign: "left" }}>Link audio:</label>
                                        <input
                                            type="text"
                                            name="album"
                                            value={songData.audio}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, marginLeft: 10, width: "300px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
                                        <label style={{ flex: "0 0 100px", textAlign: "left" }}>Link cover:</label>
                                        <input
                                            type="text"
                                            name="album"
                                            value={songData.cover}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, marginLeft: 10, width: "300px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                style={{ padding: 10, margin: 10, borderRadius: 5, cursor: "pointer" }}
                                onClick={handleCancel}
                                type="button"
                            >Cancel</button>
                            <button
                                style={{ padding: 10, margin: 10, borderRadius: 5, cursor: "pointer" }}
                                onClick={handleConfirm}
                                type="button"
                            >Confirm</button>
                        </form>
                    )}

                    {mode === "update" && (
                        <form style={{ padding: 20, margin: 20 }}>
                            <h3>Update Song</h3>
                            <div style={{ marginBottom: 10 }}>
                                <label>Select Song:</label>
                                <select onChange={handleSelectSong} style={{ padding: 10, margin: 10 }}>
                                    <option value="">Select a song</option>
                                    {songs.map(song => (
                                        <option key={song.id} value={song.id}>
                                            {song.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedSongId && (
                                <div style={{ display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                    }}
                                >
                                    <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                                        <label style={{ width: "100px" }}>Song Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={songData.name || ""}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, margin: 10, width: "300px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                                        <label style={{ width: "100px" }}>Artist:</label>
                                        <input
                                            type="text"
                                            name="artist"
                                            value={songData.artist || ""}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, margin: 10, width: "300px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                                        <label style={{ width: "100px" }}>Genre:</label>
                                        <input
                                            type="text"
                                            name="genre"
                                            value={songData.genre || ""}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, margin: 10, width: "300px" }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                                        <label style={{ width: "100px" }}>Album:</label>
                                        <input
                                            type="text"
                                            name="album"
                                            value={songData.album || ""}
                                            onChange={handleInputChange}
                                            style={{ padding: 10, margin: 10, width: "300px" }}
                                        />
                                    </div>
                                </div>                            
                            )}
                            <button
                                style={{ padding: 10, margin: 10, borderRadius: 5, cursor: "pointer" }}
                                onClick={handleCancel}
                                type="button"
                            >Cancel</button>
                            <button
                                style={{ padding: 10, margin: 10, borderRadius: 5, cursor: "pointer" }}
                                onClick={handleConfirm}
                                type="button"
                            >Confirm</button>
                        </form>
                    )}

                    {mode === "delete" && (
                        <form style={{ padding: 20, margin: 20 }}>
                            <h3>Delete Song</h3>
                            <div style={{ marginBottom: 10 }}>
                                <label>Select Song to Delete:</label>
                                <select onChange={handleSelectSong} style={{ padding: 10, margin: 10 }}>
                                    <option value="">Select a song</option>
                                    {songs.map(song => (
                                        <option key={song.id} value={song.id}>
                                            {song.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                style={{ padding: 10, margin: 10, borderRadius: 5, cursor: "pointer" }}
                                onClick={handleCancel}
                                type="button"
                            >Cancel</button>
                            <button
                                style={{ padding: 10, margin: 10, borderRadius: 5, cursor: "pointer" }}
                                onClick={handleConfirm}
                                type="button"
                            >Confirm</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default SongManagement;
