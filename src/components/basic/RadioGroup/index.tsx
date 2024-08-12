import React from "react";

import styles from "./radio-group.module.css";

export type RadioGroupProps = {
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function RadioGroup({
  options,
  selectedValue,
  onChange,
}: RadioGroupProps) {
  return (
    <div className={styles.radioGroup}>
      {options.map((option) => (
        <label key={option.value} className={styles.inputWrapper}>
          {option.label}
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className={styles.checkmark}></span>
        </label>
      ))}
    </div>
  );
}
