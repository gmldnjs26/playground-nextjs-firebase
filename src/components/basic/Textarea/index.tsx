import React, { ChangeEvent } from "react";

import styles from "./textarea.module.css";

type TextareaProps = {
  label?: string;
  value: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
  errorMessage?: string;
  onChange: (value: string) => void;
};

export default function Textarea({
  label,
  value,
  placeholder,
  rows = 3,
  maxLength = 150,
  resize = "vertical",
  errorMessage,
  onChange,
}: TextareaProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const textareaStyle = {
    resize: resize,
  };

  return (
    <div className={styles.textareaContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={styles.textarea}
        style={textareaStyle}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        rows={rows}
        maxLength={maxLength}
      ></textarea>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
