"use client";

import { auth } from "@/plugins/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContext = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContext>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorize = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setLoading(false);

      if (!fbUser) {
        router.push("/auth/sign-in");
      }
    });
    return () => authorize();
  });

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
