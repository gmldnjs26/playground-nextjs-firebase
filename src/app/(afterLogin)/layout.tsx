"use client";

import Header from "@/components/basic/Header";
import Loading from "@/components/basic/Loading";

import { useAuth } from "../auth-provider";
import styles from "./after-login-layout.module.css";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
}
