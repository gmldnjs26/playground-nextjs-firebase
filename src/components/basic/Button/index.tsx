import React, { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  width?: string;
};

export default function Button({
  onClick,
  children,
  disabled,
  width,
}: ButtonProps) {
  // 他に親から追加したいスタイルがあれば、ここで追加する
  const buttonStyle = {
    width: width || "auto",
  };

  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}
