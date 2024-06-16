import { db } from "./firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

const getAllMusic = async () => {
    try {
        const musicCollectionRef = collection(db, 'music');
        const querySnapshot = await getDocs(musicCollectionRef);
      
        const musicData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
  
        return musicData;
    } catch (error) {
        console.error('Error fetching music data: ', error);
        throw error; 
    }
};

const addMusic = async (musicData) => {
    try {
        const musicCollectionRef = collection(db, 'music');
        const docRef = await addDoc(musicCollectionRef, musicData);
        return docRef.id;
    } catch (error) {
        console.error('Error adding music: ', error);
        throw error;
    }
};

const updateMusic = async (id, data) => {
    try {
        const musicCollectionRef = collection(db, 'music');
        const querySnapshot = await getDocs(musicCollectionRef);

        let documentId = null;

        for (const doc of querySnapshot.docs) {
            const musicData = doc.data();
            if (musicData.id === id) {
                documentId = doc.id;
                break;
            }
        }

        if (documentId) {
            const musicRef = doc(db, 'music', documentId);
            await updateDoc(musicRef, data);
            return documentId;
        } else {
            throw new Error('Music not found');
        }
    } catch (error) {
        console.error("Error updating music: ", error);
        throw error;
    }
};

const deleteMusic = async (id) => {
    try {
        const musicCollectionRef = collection(db, 'music');
        const querySnapshot = await getDocs(musicCollectionRef);

        let documentId = null;

        for (const doc of querySnapshot.docs) {
            const musicData = doc.data();
            if (musicData.id === id) {
                documentId = doc.id;
                break;
            }
        }

        if (documentId) {
            const musicDoc = doc(db, 'music', documentId);
            await deleteDoc(musicDoc);
            return documentId;
        } else {
            throw new Error('Music not found');
        }
    } catch (error) {
        console.error('Error deleting music: ', error);
        throw error;
    }
};

export { getAllMusic, addMusic, updateMusic, deleteMusic };