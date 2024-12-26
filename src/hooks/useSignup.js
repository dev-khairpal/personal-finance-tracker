import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [isCancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const signup = async (email, password, fullName) => {
    setError(null);
    setLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      await updateProfile(user, { displayName: fullName });

      // Dispatch Login action
      dispatch({ type: "LOGIN", payload: user });

      if (!isCancelled) {
        setLoading(false);
        setError(null);
        toast.success("Signup successful!");
      }
    } catch (err) {
 
        console.error(err.message);
        setError(err.message);
        toast.error(err.message);
        setLoading(false);

    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { error, isLoading, signup };
};
