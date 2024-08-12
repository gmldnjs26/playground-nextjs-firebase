import React, { useState } from "react";

import Button from "@/components/basic/Button";
import Textarea from "@/components/basic/Textarea";

import styles from "./post-write-modal.module.css";

type PostWriteModalProps = {
  onClose: () => void;
  onSubmit: (content: string) => void;
};

export default function PostWriteModal({
  onClose,
  onSubmit,
}: PostWriteModalProps) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    onSubmit(content);
    setContent("");
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>新しい投稿</span>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <Textarea
          value={content}
          onChange={(value) => setContent(value)}
          placeholder="ここに内容を入力してください..."
          rows={6}
          maxLength={150}
        ></Textarea>
        <Button width="100%" onClick={handleSubmit}>
          投稿
        </Button>
      </div>
    </div>
  );
}
