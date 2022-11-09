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
  startAt,
  where,
  Query
} from "firebase/firestore";


const collectionId = "fixture"
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const useFixtureList = () => {
  
  const getList = (queryString: string, itemsLimit: number = 25, offset?: number) => {
    
    let q: Query;
    if (offset) {
      q = query(
        collection(db, collectionId),
        where("name", ">=", queryString),
        orderBy('name', 'desc'),
        startAt(offset),
        limit(itemsLimit),
      );
    } else {
      q = query(
        collection(db, collectionId),
        where("name", ">=", queryString.toLowerCase()),
        where("name", "<=", queryString.toLowerCase() + '\uf8ff'),
        orderBy('name', 'desc'),
        limit(itemsLimit),
      );
    }
    return getDocs(q);
  }

  return { getList };
}

export { useFixtureList };