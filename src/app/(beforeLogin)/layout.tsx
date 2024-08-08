import styles from "./before-login-layout.module.css";

export default function BeforeLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
