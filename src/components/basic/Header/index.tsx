import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.linkButton} href="/">
        Top
      </Link>
      <div className={styles.authButtons}>
        <Link className={styles.linkButton} href="/auth/sign-in">
          Sign In
        </Link>
        <Link className={styles.linkButton} href="/auth/sign-up">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
