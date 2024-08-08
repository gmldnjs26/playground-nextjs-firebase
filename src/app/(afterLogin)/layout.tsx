import Header from "@/components/basic/Header";
import styles from "./after-login-layout.module.css";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}
