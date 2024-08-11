"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import Button from "@/components/basic/Button";
import Input from "@/components/basic/Input";
import { auth } from "@/plugins/firebase";

import styles from "./sign-in-page.module.css";

const signInUserSchema = z.object({
  email: z.string().min(1, { message: "メールを入力してください" }),
  password: z.string().min(1, { message: "パスワードを入力してください" }),
});

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );

  const handleLogin = async () => {
    try {
      // Validation
      setErrorMessages({});
      signInUserSchema.parse({
        email: email,
        password: password,
      });

      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        router.push("/posts");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, error) => {
          return { ...acc, [error.path[0]]: error.message };
        }, {});
        setErrorMessages(errors);
      } else {
        console.error(error);
      }
    }
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
        errorMessage={errorMessages.email}
        onChange={(value) => setEmail(value)}
      />
      <Input
        type="password"
        label="パスワード"
        placeholder="パスワードを入力してください"
        width="300px"
        value={password}
        errorMessage={errorMessages.password}
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
