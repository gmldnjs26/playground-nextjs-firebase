import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div>
      <svg
        className={styles.loading}
        height="100%"
        viewBox="0 0 32 32"
        width={40}
      >
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{ stroke: "#be9962", opacity: 0.2 }}
        ></circle>
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: "#be9962",
            strokeDasharray: 80,
            strokeDashoffset: 60,
          }}
        ></circle>
      </svg>
    </div>
  );
}
