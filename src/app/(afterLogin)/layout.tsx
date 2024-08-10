"use client";

import Header from "@/components/basic/Header";
import styles from "./after-login-layout.module.css";
import { useAuth } from "../auth-provider";
import Loading from "@/components/basic/Loading";

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
      {children}
    </div>
  );
}
