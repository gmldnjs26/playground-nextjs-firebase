"use client";

import { auth } from "@/plugins/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
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

const noRedirectPaths = ["/auth/sign-in", "/auth/sign-up"];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorize = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setLoading(false);

      if (!fbUser && !noRedirectPaths.includes(pathName)) {
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
