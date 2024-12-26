import { useState, useEffect, useReducer } from "react";
import { db, timestamp } from "../firebase/config";
import { collection, addDoc, doc, getDoc, deleteDoc } from "firebase/firestore"; // Correct import

// Initial state
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false, // Default to false
};

// Reducer function
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, success: false, error: null, isPending: true };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true, // Set success to true after document is added
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Custom Hook
export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // Collection reference
  const ref = collection(db, collectionName);

  // Add document function
  const addDocument = async (doc) => {
    const createdAt = timestamp.fromDate(new Date());
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocumentRef = await addDoc(ref, { ...doc, createdAt });

      // Fetch the added document data using the reference
      const addedDocumentSnap = await getDoc(addedDocumentRef);

      // Check if the document exists and dispatch with document data
      if (addedDocumentSnap.exists()) {
        dispatch({
          type: "ADDED_DOCUMENT",
          payload: { id: addedDocumentSnap.id, ...addedDocumentSnap.data() },
        });
      } else {
        dispatch({
          type: "ERROR",
          payload: "Document not found after addition",
        });
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const documentRef = doc(db, collectionName, id); // Correct way to get document reference
      await deleteDoc(documentRef); // Delete the document

      dispatch({ type: "DELETED_DOCUMENT", payload: id });
    } catch (err) {
      dispatch({ type: "ERROR", payload: "Could not delete the document" });
    }
  };

  useEffect(() => {}, [response]);

  return { addDocument, response, deleteDocument };
};
