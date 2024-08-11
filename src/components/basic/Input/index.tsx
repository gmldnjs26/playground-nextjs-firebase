import React, { ChangeEvent } from "react";

import styles from "./input.module.css";

type InputProps = {
  type?: string;
  label?: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  width?: string; // Add the width prop
  errorMessage?: string;
  onChange: (value: string) => void;
};

export default function Input({
  type = "text",
  label,
  placeholder,
  value,
  width,
  maxLength,
  errorMessage,
  onChange,
}: InputProps) {
  const inputStyle = {
    width: width || "auto",
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClassName = `${styles.input} ${errorMessage ? styles.error : ""}`;

  return (
    <div className={styles.inputContainer} style={inputStyle}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={handleInputChange}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}
