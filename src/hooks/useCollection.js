import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useRef, useState } from "react";

export const useCollection = (collectionName, queryCondition, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const _query = useRef(queryCondition).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    // Reference to the collection
    let ref = collection(db, collectionName);

    // If queryCondition is passed, apply it
    if (_query) {
      ref = query(ref, where(..._query));  // Apply where condition
    }

    // If orderBy is passed, apply it
    if (orderByRef) {
      ref = query(ref, orderBy(...orderByRef));  // Apply orderBy condition
    }

    // Set up a real-time listener
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // Update state with fetched data
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.error("Error fetching collection data:", error);
        setError("Could not fetch the data");
      }
    );

    // Unsubscribe from the listener on cleanup
    return () => unsub();
  }, [collectionName, queryCondition, orderByRef]);  // Re-run when collectionName or queryCondition changes

  return { documents, error };
};
