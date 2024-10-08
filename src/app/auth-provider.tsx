"use client";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth, firestore } from "@/plugins/firebase";
import { IUser } from "@/types/user";

type AuthContext = {
  user: IUser | null;
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

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorize = onAuthStateChanged(auth, async (fbUser) => {
      // ユーザーセッションがない場合はログインペ
      if (!fbUser && !noRedirectPaths.includes(pathName)) {
        setUser(null);
        router.push("/auth/sign-in");
      }

      // ユーザーセッションがあルガ、ユーザー情報がない場合は取得しに行く
      if (fbUser && !user) {
        const userDoc = doc(firestore, "users", fbUser.uid);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
          setUser({ uid: fbUser.uid, ...userDocSnap.data() } as IUser);
        }
      }

      setLoading(false);
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
