import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/app/auth-provider";
import Button from "@/components/basic/Button";
import UserProfile from "@/components/features/user/UserProfile";
import { auth as firebaseAuth } from "@/plugins/firebase";

import styles from "./header.module.css";

export default function Header() {
  const auth = useAuth();

  const handleLogout = async () => {
    // NOTE: ログアウト関数を実行するとauth-providerで登録したonAuthStateChangedのコールバックが呼ばれるのでログイン画面に遷移される
    await signOut(firebaseAuth);
  };

  return (
    <header className={styles.header}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/gmldnjs26/playground-nextjs-firebase"
      >
        <Image
          src="/images/github.png"
          width={44}
          height={44}
          objectFit="cover"
          alt="logo"
        />
      </a>
      <div className={styles.authButtons}>
        {auth.user && <UserProfile user={auth.user} />}
        <Button onClick={handleLogout}>ログアウト</Button>
      </div>
    </header>
  );
}
