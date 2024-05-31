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
    const [recommendedSongs, setRecommendedSongs] = useState([]);

    // Hàm tính Jaccard similarity
    function jaccardSimilarity(setA, setB) {
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const union = new Set([...setA, ...setB]);
        return intersection.size / union.size;
    }

    // Hàm tạo tập hợp từ các thuộc tính của bài hát
    function createAttributeSet(song) {
        return new Set(['genre', 'artist', 'album', 'explicit'].map(attr => song[attr]));
    }

    // Hàm tính Cosine Similarity
    function cosineSimilarity(songA, songB) {
        const attributes = ['tempo', 'danceability', 'valence', 'energy', 'duration', 'loudness'];
        const dotProduct = attributes.reduce((sum, attr) => sum + songA[attr] * songB[attr], 0);
        const magnitudeA = Math.sqrt(attributes.reduce((sum, attr) => sum + songA[attr] * songA[attr], 0));
        const magnitudeB = Math.sqrt(attributes.reduce((sum, attr) => sum + songB[attr] * songB[attr], 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    // Hàm tính Euclidean Distance
    function euclideanDistance(songA, songB) {
        const attributes = ['tempo', 'danceability', 'valence', 'energy', 'duration', 'loudness'];
        return Math.sqrt(attributes.reduce((sum, attr) => sum + Math.pow(songA[attr] - songB[attr], 2), 0));
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
                this.queueAttributeSets.map((setA, i) => jaccardSimilarity(setA, setB))
            );

            // Tính Cosine similarity và Euclidean Distance giữa mỗi bài trong queue với mỗi bài trong allSongs
            this.cosineSimMatrix = this.allSongs.map((songB, j) =>
                this.queue.map((songA, i) => cosineSimilarity(songA, songB))
            );

            this.euclideanDistMatrix = this.allSongs.map((songB, j) =>
                this.queue.map((songA, i) => euclideanDistance(songA, songB))
            );

            // In ra các ma trận trọng số
            console.log("Jaccard Similarity Matrix:", this.jaccardSimMatrix);
            console.log("Cosine Similarity Matrix:", this.cosineSimMatrix);
            console.log("Euclidean Distance Matrix:", this.euclideanDistMatrix);
        }

        getTopJaccardRecommendations() {
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

            // Lấy 2 bài hát có điểm số cao nhất
            const topJaccardRecommendations = sortedSimScores.slice(0, 2).map(({ song }) => song);
            console.log("Top Jaccard Recommendations: ", topJaccardRecommendations);
            return topJaccardRecommendations;
        }

        getTopCosineEuclideanRecommendations(excludeSongs) {
            // Tính tổng điểm số Cosine similarity và Euclidean Distance
            const totalCosineScores = this.cosineSimMatrix.map((simScores, j) => ({
                song: this.allSongs[j],
                totalScore: simScores.reduce((sum, score) => sum + score, 0)
            }));

            const totalEuclideanScores = this.euclideanDistMatrix.map((distScores, j) => ({
                song: this.allSongs[j],
                totalScore: distScores.reduce((sum, dist) => sum + dist, 0)
            }));

            // Kết hợp điểm số trung bình của Cosine và Euclidean
            const combinedScores = totalCosineScores.map((cosineScore, j) => ({
                song: cosineScore.song,
                totalScore: (cosineScore.totalScore + (1 / (1 + totalEuclideanScores[j].totalScore))) / 2
            }));

            // Loại bỏ các bài hát đã có trong queue và các bài hát đã được gợi ý từ Jaccard
            const filteredSimScores = combinedScores.filter(({ song }) =>
                !this.queue.some(queueSong => queueSong.id === song.id) &&
                !excludeSongs.some(excludeSong => excludeSong.id === song.id)
            );

            // Sắp xếp theo tổng điểm số giảm dần
            const sortedSimScores = filteredSimScores.sort((a, b) =>
                b.totalScore - a.totalScore
            );

            // Lấy 3 bài hát có điểm số cao nhất
            const topCosineEuclideanRecommendations = sortedSimScores.slice(0, 3).map(({ song }) => song);
            console.log("Top Cosine-Euclidean Recommendations: ", topCosineEuclideanRecommendations);
            return topCosineEuclideanRecommendations;
        }

        getTopRecommendations() {
            const jaccardRecommendations = this.getTopJaccardRecommendations();
            const cosineEuclideanRecommendations = this.getTopCosineEuclideanRecommendations(jaccardRecommendations);
            return [...jaccardRecommendations, ...cosineEuclideanRecommendations];
        }
    }

    // Khởi tạo hệ thống gợi ý
    useEffect(() => {
        if (listQueue.length === 0) {
            setRecommendedSongs([]);
        }

        if (listQueue.length > 0) {
            const recommender = new SongRecommender(listQueue, songs);
            const topRecommendations = recommender.getTopRecommendations();

            console.log("Top Recommended Songs: ", topRecommendations);
            setRecommendedSongs(topRecommendations);
        }
    }, [listQueue, songs]);

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
