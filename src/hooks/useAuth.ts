import { useEffect, useState } from "react";

import { User } from "firebase/auth";
import { auth } from "../services/Firebase/firebase"; // Asegúrate de que la ruta sea correcta

interface AuthState {
  user: User | null;
  loading: boolean;
}

const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthState({ user, loading: false });
    });

    return () => unsubscribe();
  }, []);

  return authState;
};

export default useAuth;
