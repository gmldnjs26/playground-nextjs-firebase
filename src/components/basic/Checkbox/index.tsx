import React from "react";

import styles from "./checkbox.module.css";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={styles.checkmark}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
