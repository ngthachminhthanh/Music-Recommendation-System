import LibrarySong from "./LibrarySong";
import { useEffect } from "react";

export default function ListRecommend({
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    audioRef,
    isPlaying,
    listStatus,
    listQueue,
    setListQueue,
    listRecommend,
    setListRecommend,
    typeOfButton,
}) {
    // Hàm tính cosine similarity
    function cosineSimilarity(vecA, vecB) {
        const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    // Hàm tính TF-IDF
    function computeTFIDF(songs) {
        const termFrequency = {};
        const documentFrequency = {};
        const numDocuments = songs.length;

        // Tính TF và DF
        songs.forEach(song => {
            const terms = song.lyrics.split(/\W+/).filter(Boolean);
            const tf = {};
            terms.forEach(term => {
                if (!tf[term]) tf[term] = 0;
                tf[term]++;
            });
            termFrequency[song.name] = tf;

            const uniqueTerms = new Set(terms);
            uniqueTerms.forEach(term => {
                if (!documentFrequency[term]) documentFrequency[term] = 0;
                documentFrequency[term]++;
            });
        });

        console.log(termFrequency);
        console.log(documentFrequency);

        // Tính TF-IDF
        const tfidfVectors = songs.map(song => {
            const tf = termFrequency[song.name];
            const tfidf = {};
            for (let term in tf) {
                tfidf[term] = (tf[term] / Object.keys(tf).length) * Math.log(numDocuments / (1 + documentFrequency[term]));
            }

            console.log(tfidf)

            return tfidf;
        });

        return tfidfVectors;
    }

    // Hàm chuyển đổi TF-IDF thành vector
    function convertToVector(tfidf, vocabulary) {
        return vocabulary.map(term => tfidf[term] || 0);
    }

    // Lớp hệ thống gợi ý
    class SongRecommender {
        constructor(songs) {
            this.updateData(songs);
        }

        updateData(songs) {
            this.songs = songs;

            // Tính toán TF-IDF cho mỗi bài hát
            const tfidfVectors = computeTFIDF(songs);
            const vocabulary = Array.from(new Set(songs.flatMap(song => song.lyrics.split(/\W+/).filter(Boolean))));
            this.tfidfVectors = tfidfVectors.map(tfidf => convertToVector(tfidf, vocabulary));

            // Tính cosine similarity giữa các bài hát
            this.cosineSimMatrix = this.tfidfVectors.map(vecA => this.tfidfVectors.map(vecB => cosineSimilarity(vecA, vecB)));
        }

        getAllRecommendations() {
            return this.songs.map((song, index) => {
                const simScores = this.cosineSimMatrix[index]
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
    }

    let allRecommendedSongs=[];
    
    // Khởi tạo hệ thống gợi ý
    if (listQueue.length !== 0) {
        const recommender = new SongRecommender(listQueue);
        // Gợi ý các bài hát dựa trên tất cả các bài hát trong danh sách
        allRecommendedSongs = recommender.getAllRecommendations();
        console.log(allRecommendedSongs);
    }

    return (
        <>
            <h2>Recommend</h2>
            <div className="list_songs" style={ allRecommendedSongs.length == 0 ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            } : null }>
                {   
                    allRecommendedSongs.length !== 0 ? allRecommendedSongs.map((song) => (
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
                        There are no suitable songs to recommend...
                    </p>
                    )
                }
            </div>
        </>
    );
}
