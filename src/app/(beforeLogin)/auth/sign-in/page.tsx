"use client";

import { useState } from "react";
import styles from "./sign-in-page.module.css";
import Input from "@/components/basic/Input";
import Button from "@/components/basic/Button";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("login");
  };

  return (
    <div className={styles.signInPage}>
      <h1>ログイン</h1>
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
      <Button width="200px" onClick={handleLogin}>
        ログイン
      </Button>
      <Link className={styles.linkButton} href="/auth/sign-up">
        アカウントをお持ちではない方はこちら
      </Link>
    </div>
  );
}
