// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  query,
  orderBy,
  getDocs
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const useFixtureList = () => {

  const getList = async (offset: number, collectionId: string) => {
    const colRef = collection(db, collectionId);
    const q = query(colRef, orderBy('name', 'desc'));
    return getDocs(q);
    
  }

  return { getList };
}

export { useFixtureList };