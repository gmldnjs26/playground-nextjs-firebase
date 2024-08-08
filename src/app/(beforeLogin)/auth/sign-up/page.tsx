"use client";

import { useState } from "react";
import styles from "./sign-up-page.module.css";
import Input from "@/components/basic/Input";
import Button from "@/components/basic/Button";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    console.log("register");
  };

  return (
    <div className={styles.signUpPage}>
      <h1>サインアップ</h1>
      <Input
        type="email"
        label="メールアドレス"
        placeholder="test@example.com"
        width="300px"
        value={email}
        onChange={(value) => setEmail(value)}
      />
      <Input
        type="password"
        label="パスワード"
        placeholder="パスワードを入力してください"
        width="300px"
        value={password}
        onChange={(value) => setPassword(value)}
      />
      <Input
        type="password"
        label="パスワード（確認）"
        placeholder="パスワードを入力してください"
        width="300px"
        value={confirmPassword}
        onChange={(value) => setConfirmPassword(value)}
      />
      <Button width="200px" onClick={handleRegister}>
        ログイン
      </Button>
    </div>
  );
}
