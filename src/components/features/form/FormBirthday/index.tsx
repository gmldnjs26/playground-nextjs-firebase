import React, { useState } from "react";
import styles from "./form-birthdaty.module.css";
import Input from "@/components/basic/Input";

type FormBirthdayProps = {
  onChange: (birthday: string) => void;
};

export default function FormBirthday({ onChange }: FormBirthdayProps) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const handleYearChange = (value: string) => {
    setYear(value);
    triggerOnChange(value, month, day);
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    triggerOnChange(year, value, day);
  };

  const handleDayChange = (value: string) => {
    setDay(value);
    triggerOnChange(year, month, value);
  };

  const triggerOnChange = (y: string, m: string, d: string) => {
    if (y && m && d) {
      onChange(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
    }
  };

  return (
    <div className={styles.birthdayContainer}>
      <div className={styles.label}>生年月日</div>
      <div className={styles.inputWrapper}>
        <Input
          type="text"
          value={year}
          placeholder="YYYY"
          width="100%"
          onChange={handleYearChange}
        />
        <Input
          type="text"
          value={month}
          placeholder="MM"
          width="100%"
          onChange={handleMonthChange}
        />
        <Input
          type="text"
          value={day}
          placeholder="DD"
          width="100%"
          onChange={handleDayChange}
        />
      </div>
    </div>
  );
}
