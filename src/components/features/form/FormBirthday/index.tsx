import React, { useState } from "react";

import Input from "@/components/basic/Input";
import { IDate } from "@/types/common";

import styles from "./form-birthday.module.css";

type FormBirthdayProps = {
  errorMessage?: string;
  onChange: (birthday?: IDate) => void;
};

export default function FormBirthday({
  onChange,
  errorMessage,
}: FormBirthdayProps) {
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
    if (y.length === 4 && m.length >= 1 && d.length >= 1) {
      onChange({ year: +y, month: +m, day: +d });
    } else {
      onChange();
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
          maxLength={4}
          width="100%"
          onChange={handleYearChange}
        />
        <Input
          type="text"
          value={month}
          placeholder="MM"
          maxLength={2}
          width="100%"
          onChange={handleMonthChange}
        />
        <Input
          type="text"
          value={day}
          placeholder="DD"
          maxLength={2}
          width="100%"
          onChange={handleDayChange}
        />
      </div>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}
