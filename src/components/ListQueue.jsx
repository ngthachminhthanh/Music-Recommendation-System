import React, { useState } from 'react';
import LibrarySong from "./LibrarySong";
import { RiPlayListAddFill } from "react-icons/ri";
import PlaylistNameModal from './PlaylistNameModal';
import { getFirestore, collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

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
    setListRecommend,
    user
}) {
    const [showModal, setShowModal] = useState(false);

    const addPlaylist = () => {
        if (listQueue.length > 0 && user) {
            setShowModal(true);
        } else if (!user) {
            alert('Vui lòng đăng nhập để tạo playlist.');
        } else {
            alert('Không có bài hát nào trong hàng đợi để tạo playlist.');
        }
    }

    const handleSavePlaylist = async (playlistName) => {
        if (!user) {
            alert('Vui lòng đăng nhập để lưu playlist.');
            return;
        }

        const newPlaylist = {
            playlistName: playlistName,
            songs: listQueue
        };

        try {
            // Tìm document của user dựa trên username
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where("username", "==", user.username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('Không tìm thấy thông tin người dùng.');
                return;
            }

            // Lấy document đầu tiên (và duy nhất) từ kết quả truy vấn
            const userDoc = querySnapshot.docs[0];

            // Cập nhật document với playlist mới
            await updateDoc(userDoc.ref, {
                playlists: arrayUnion(newPlaylist)
            });

            alert('Playlist đã được lưu thành công!');
        } catch (error) {
            console.error("Error adding playlist: ", error);
            alert('Có lỗi xảy ra khi lưu playlist. Vui lòng thử lại.');
        }

        setShowModal(false);
    }

    const handleCancelPlaylist = () => {
        setShowModal(false);
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: "center"}}>
                <h2 style={{ 
                    padding: '2rem 1rem 2rem 2rem',
                }}>Danh sách đợi phát</h2>
                <button style={{ 
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    marginBottom: 4,
                    cursor: 'pointer',
                }} onClick={addPlaylist}>
                    <RiPlayListAddFill style={{
                        fontSize: 24,
                    }}/>
                </button>
            </div>
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
            {showModal && (
                <PlaylistNameModal
                    onSave={handleSavePlaylist}
                    onCancel={handleCancelPlaylist}
                />
            )}
        </>
    );
}