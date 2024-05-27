import LibrarySong from "./LibrarySong";
import { useEffect, useState, memo } from "react";

const ListRecommend = ({
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    audioRef,
    isPlaying,
    listQueue,
    setListQueue,
    typeOfButton,
}) => {
    let arrtemp = songs;
    console.log("Mảng copy (arrtemp) từ mảng data gốc (songs): ", arrtemp);

    const [recommendedSongs, setRecommendedSongs] = useState([]);

    console.log("Danh sách bài hát gốc (songs): ", songs );
    console.log("Danh sách các bài hiện có trong hàng chờ (listQueue): ",listQueue)
    console.log("Danh sách các bài được gợi ý (recommendedSongs): ",recommendedSongs)

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
        constructor(queue, allSongs) {
            this.queue = queue;
            this.allSongs = allSongs;

            // Tính toán tập hợp cho mỗi bài hát trong queue và allSongs
            this.queueAttributeSets = queue.map(createAttributeSet);
            this.allSongsAttributeSets = allSongs.map(createAttributeSet);

            // Tính Jaccard similarity giữa mỗi bài trong queue với mỗi bài trong allSongs
            this.jaccardSimMatrix = this.allSongsAttributeSets.map((setB, j) =>
                this.queueAttributeSets.map((setA, i) => {
                    const sim = jaccardSimilarity(setA, setB);
                    console.log(`Jaccard similarity between ${this.allSongs[j].name} and ${this.queue[i].name}: ${sim}`);
                    return sim;
                })
            );
        }

        getTopRecommendations() {
            // Tính tổng điểm số Jaccard cho mỗi bài hát trong allSongs với tất cả các bài hát trong queue
            const totalSimScores = this.jaccardSimMatrix.map((simScores, j) => ({
                song: this.allSongs[j],
                totalScore: simScores.reduce((sum, score) => sum + score, 0),
                matchesArtist: this.queue.some(queueSong => queueSong.artist === this.allSongs[j].artist)
            }));

            // Loại bỏ các bài hát đã có trong queue
            const filteredSimScores = totalSimScores.filter(({ song }) =>
                !this.queue.some(queueSong => queueSong.id === song.id)
            );

            // Sắp xếp theo tổng điểm số Jaccard giảm dần và ưu tiên bài hát có cùng artist nếu điểm số bằng nhau
            const sortedSimScores = filteredSimScores.sort((a, b) =>
                b.totalScore - a.totalScore || (b.matchesArtist ? 1 : -1)
            );

            // Lấy 3 bài hát có điểm số cao nhất
            return sortedSimScores.slice(0, 3).map(({ song }) => song);
        }
    }

    // Khởi tạo hệ thống gợi ý
    useEffect(() => {
        if (listQueue.length === 0) {
            setRecommendedSongs([]);
        }

        if (listQueue.length > 0) {
            const recommender = new SongRecommender(listQueue, arrtemp);
            const topRecommendations = recommender.getTopRecommendations();

            console.log("Top Recommended Songs: ", topRecommendations);
            setRecommendedSongs(topRecommendations);
        }
    }, [listQueue, arrtemp]);

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
                            songs={songs}
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
                            There are no suitable songs to recommend
                        </p>
                    )
                }
            </div>
        </>
    );
}

export default memo(ListRecommend);
