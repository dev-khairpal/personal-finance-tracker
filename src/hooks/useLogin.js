import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setCancelled] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Firebase Response:", res);

      // Dispatch the correct action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      console.log("Login Error:", error.message);
      toast.error(error.message);
      if (!isCancelled) {
        setError(error.message);
        setLoading(false); // Ensure the button gets enabled after error
      }
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { error, isLoading, login };
};
