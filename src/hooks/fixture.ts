// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAt
} from "firebase/firestore";
const collectionId = "fixture"
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const useFixtureList = () => {
  
  const getList = (itemsLimit: number = 25, offset?: number) => {
    let q;
    if (offset) {
      q = query(
        collection(db, collectionId),
        orderBy('name', 'desc'),
        startAt(offset),
        limit(itemsLimit),
      );
    } else {
      q = query(collection(db, collectionId), orderBy('name', 'desc'), limit(itemsLimit));
    }
    return getDocs(q);
  }

  return { getList };
}

export { useFixtureList };