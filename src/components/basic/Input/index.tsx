import React, { ChangeEvent } from "react";
import styles from "./input.module.css";

type InputProps = {
  type?: string;
  label?: string;
  value: string;
  placeholder?: string;
  width?: string; // Add the width prop
  onChange: (value: string) => void;
};

export default function Input({
  type = "text",
  label,
  placeholder,
  value,
  width,
  onChange,
}: InputProps) {
  const inputStyle = {
    width: width || "auto",
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer} style={inputStyle}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}
