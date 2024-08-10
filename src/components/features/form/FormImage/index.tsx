"use client";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import styles from "./form-image.module.css";

interface FormImageProps {
  className?: string;
  value?: File;
  defaultSrc?: string;
  onChange: (value: File) => void;
}

export default function FormImage({
  className = "",
  value,
  defaultSrc = "",
  onChange,
}: FormImageProps) {
  const [file, setFile] = useState<File | undefined>(value);
  const [source, setSource] = useState<string>(defaultSrc);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      setFile(uploadFile);
      setSource(URL.createObjectURL(uploadFile));
      onChange(uploadFile);
    }
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <div
      className={`${styles.formImageContainer} ${className}`}
      onClick={handleClick}
    >
      <input
        className={styles.hiddenInput}
        type="file"
        onChange={handleChange}
        ref={inputRef}
      />
      <Image
        className={styles.image}
        src={source}
        alt={file?.name ?? ""}
        fill
      />
    </div>
  );
}
