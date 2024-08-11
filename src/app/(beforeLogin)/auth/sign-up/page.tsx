"use client";

import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import Button from "@/components/basic/Button";
import Checkbox from "@/components/basic/Checkbox";
import Input from "@/components/basic/Input";
import RadioGroup from "@/components/basic/RadioGroup";
import FormBirthday from "@/components/features/form/FormBirthday";
import FormImage from "@/components/features/form/FormImage";
import { auth, firestore, storage } from "@/plugins/firebase";
import { IDate } from "@/types/common";
import { firebaseErrorCodes, genderOptions } from "@/utils/const";

import styles from "./sign-up-page.module.css";

const signUpUserSchema = z.object({
  email: z.string().min(1, { message: "メールを入力してください" }),
  password: z.string().min(1, { message: "パスワードを入力してください" }),
  name: z.string().min(1, { message: "名前を入力してください" }),
  birthday: z.object({ year: z.number(), month: z.number(), day: z.number() }),
  isAgreed: z.literal(true, {
    errorMap: () => ({ message: "利用規約に同意してください" }),
  }),
});

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileIcon, setProfileIcon] = useState<File>();
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState<IDate>();
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );

  const handleRegister = async () => {
    try {
      // Validation
      setErrorMessages({});
      signUpUserSchema.parse({
        email: email,
        password: password,
        name: name,
        birthday: birthday,
        isAgreed: isAgreed,
      });

      const res = await createUserWithEmailAndPassword(auth, email, password);

      let profileIconUrl = "";
      if (profileIcon) {
        const storageRef = ref(storage, `users/${res.user.uid}/profile-icon`);
        const uploadSnapshot = await uploadBytes(storageRef, profileIcon);
        profileIconUrl = await getDownloadURL(uploadSnapshot.ref);
      }

      const userDoc = doc(firestore, "users", res.user.uid);
      await setDoc(userDoc, {
        name: name,
        email: email,
        profileIconUrl: profileIconUrl,
        gender: gender,
        birthday: birthday,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      alert("登録が完了しました");
      router.push("/auth/sign-in");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === firebaseErrorCodes.emailAlreadyInUse) {
          alert("既に登録されているメアドです");
        }
      } else if (error instanceof z.ZodError) {
        let validationErrors: { [key: string]: string } = {};
        error.errors.forEach((e) => {
          const key = String(e.path[0]);
          switch (key) {
            // case "isAgreed":
            //   validationErrors[key] = "利用規約に同意してください";
            //   break;
            case "birthday":
              validationErrors[key] = "生年月日を入力してください";
              break;
            default:
              validationErrors[key] = e.message;
              break;
          }
        });
        setErrorMessages(validationErrors);
      } else {
        alert("登録する際にエラーが発生しました");
      }
    }
  };

  return (
    <div className={styles.signUpPage}>
      <h1>サインアップ</h1>
      <FormImage
        className={styles.profileIcon}
        value={profileIcon}
        defaultSrc={"/images/user.webp"}
        onChange={setProfileIcon}
      />
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
      <Input
        type="text"
        label="名前"
        placeholder="山田 太郎"
        width="300px"
        value={name}
        errorMessage={errorMessages.name}
        onChange={(value) => setName(value)}
      />
      <FormBirthday
        onChange={(value) => setBirthday(value)}
        errorMessage={errorMessages.birthday}
      />
      <RadioGroup
        selectedValue={gender}
        options={genderOptions}
        onChange={(value) => setGender(value)}
      />
      <div>
        <div className={styles.termsContainer}>
          <Checkbox
            checked={isAgreed}
            onChange={(value) => setIsAgreed(value)}
          />
          <span className={styles.termsText}>
            <a
              href="https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc"
              target="_blank"
              rel="noopener noreferrer"
            >
              利用規約
            </a>
            に同意します
          </span>
        </div>
        {errorMessages.isAgreed && (
          <div className={styles.termsErrorMessage}>
            {errorMessages.isAgreed}
          </div>
        )}
      </div>
      <Button width="300px" onClick={handleRegister}>
        登録
      </Button>
    </div>
  );
}
