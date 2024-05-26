import LibrarySong from "./LibrarySong";
import { useEffect, useState } from "react";

export default function ListRecommend({
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    audioRef,
    isPlaying,
    listQueue,
    setListQueue,
    typeOfButton,
}) {
    // Nếu sợ thao tác làm ảnh hưởng mảng data gốc thì tạo 1 bản copy rồi xài như sau
    let arrtemp = songs;
    console.log(arrtemp)

    const [recommendedSongs, setRecommendedSongs] = useState([]);

    // Hàm tính Jaccard similarity
    function jaccardSimilarity(setA, setB) {
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const union = new Set([...setA, ...setB]);
        return intersection.size / union.size;
    }


    // Hàm tạo tập hợp từ các thuộc tính của bài hát
    function createAttributeSet(song) {
        return new Set(['genre', 'artist', 'album'].map(attr => song[attr]));
    }

    // Lớp hệ thống gợi ý
    class SongRecommender {
        constructor(songs) {
            this.updateData(songs);
        }

        updateData(songs) {
            this.songs = songs;

            // Tính toán tập hợp cho mỗi bài hát
            this.attributeSets = songs.map(createAttributeSet);

            // Tính Jaccard similarity giữa các bài hát
            this.jaccardSimMatrix = this.attributeSets.map((setA, i) =>
                this.attributeSets.map((setB, j) => {
                    if (i === j) return 0; // Nếu index của setA và setB giống nhau, trả về 0
                    const sim = jaccardSimilarity(setA, setB);
                    console.log(`Jaccard similarity between ${this.songs[i].name} and ${this.songs[j].name}: ${sim}`);
                    return sim;
                })
            );
        }

        getAllRecommendations() {
            return this.songs.map((song, index) => {
                const simScores = this.jaccardSimMatrix[index]
                    .map((score, idx) => ({ idx, score }))
                    .sort((a, b) => b.score - a.score)
                    .filter(pair => pair.idx !== index)
                    .map(pair => this.songs[pair.idx]);

                return {
                    ...song,
                    recommendations: simScores.slice(0, 3) // Lấy 3 bài hát gợi ý tương tự nhất
                };
            });
        }

        getRecommendationsForCurrentSong(currentSongId) {
            const songIndex = this.songs.findIndex(song => song.id === currentSongId);
            if (songIndex === -1) return [];

            const simScores = this.jaccardSimMatrix[songIndex]
                .map((score, idx) => ({ idx, score }))
                .sort((a, b) => b.score - a.score)
                .filter(pair => pair.idx !== songIndex)
                .map(pair => this.songs[pair.idx]);

            return simScores.slice(0, 3); // Lấy 3 bài hát gợi ý tương tự nhất
        }
    }

    // Khởi tạo hệ thống gợi ý
    useEffect(() => {
        if (listQueue.length > 0) {
            const recommender = new SongRecommender(listQueue);
            let recommendations = [];

            if (currentSong) {
                recommendations = recommender.getRecommendationsForCurrentSong(currentSong.id);
            } else {
                // Nếu không có currentSong, lấy gợi ý từ bài hát đầu tiên trong hàng đợi
                recommendations = recommender.getRecommendationsForCurrentSong(listQueue[0].id);
            }

            console.log("All Recommended Songs: ", recommender.getAllRecommendations());
            console.log("Current Song Recommendations: ", recommendations);
            setRecommendedSongs(recommendations);
        }
    }, [listQueue, currentSong]);

    return (
        <>
            <h2>Recommend</h2>
            <div className="list_songs" style={recommendedSongs.length === 0 ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            } : null}>
                {
                    recommendedSongs.length !== 0 ? recommendedSongs.map((song) => (
                        <LibrarySong
                            setCurrentSong={setCurrentSong}
                            song={song}
                            setSongs={setSongs}
                            songs={listQueue}
                            id={song.id}
                            key={song.id}

                            isPlaying={isPlaying}
                            audioRef={audioRef}
                            typeOfButton={typeOfButton}
                            listQueue={listQueue}
                            setListQueue={setListQueue}
                        />
                    )) : (
                        <p style={{
                            color: 'gray'
                        }}>
                            There are no suitable songs to recommend...
                        </p>
                    )
                }
            </div>
        </>
    );
}