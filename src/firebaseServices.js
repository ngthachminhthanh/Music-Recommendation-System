import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

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
  
export { getAllMusic };