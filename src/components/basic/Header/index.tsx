import { signOut } from "firebase/auth";
import Link from "next/link";

import { useAuth } from "@/app/auth-provider";
import Button from "@/components/basic/Button";
import { auth as firebaseAuth } from "@/plugins/firebase";

import styles from "./header.module.css";

export default function Header() {
  const auth = useAuth();

  const handleLogout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <header className={styles.header}>
      <Link className={styles.linkButton} href="/">
        Top
      </Link>
      <div className={styles.authButtons}>
        <div>{auth.user?.name}様</div>
        <Button onClick={handleLogout}>ログアウト</Button>
      </div>
    </header>
  );
}
