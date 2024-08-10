"use client";

import { useState } from "react";
import styles from "./sign-up-page.module.css";
import Input from "@/components/basic/Input";
import Button from "@/components/basic/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore, storage } from "@/plugins/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import FormImage from "@/components/features/form/FormImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import RadioGroup from "@/components/basic/RadioGroup";
import FormBirthday from "@/components/features/form/FormBirthday";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileIcon, setProfileIcon] = useState<File>();
  const [gender, setGender] = useState("male");
  const genderOptions = [
    { label: "男性", value: "male" },
    { label: "女性", value: "female" },
  ];
  const [birthday, setBirthday] = useState("");

  const handleBirthdayChange = (value: string) => {
    setBirthday(value);
  };

  const handleRegister = async () => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    const userDoc = doc(firestore, "users", res.user.uid);
    const userDocSnapshot = await getDoc(userDoc);

    if (userDocSnapshot.exists()) {
      return alert("既に登録されているユーザーです");
    }

    console.log("hjasdasd");

    let profileIconUrl = "";

    if (profileIcon) {
      const storageRef = ref(storage, `users/${res.user.uid}/profile-icon`);
      const uploadSnapshot = await uploadBytes(storageRef, profileIcon);
      profileIconUrl = await getDownloadURL(uploadSnapshot.ref);
    }

    // ユーザーが存在しない場合のみユーザー情報を登録
    await setDoc(userDoc, {
      name: name,
      email: email,
      profileIconUrl: profileIconUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
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
        type="text"
        label="名前"
        placeholder="山田 太郎"
        width="300px"
        value={name}
        onChange={(value) => setName(value)}
      />
      <RadioGroup
        selectedValue={gender}
        options={genderOptions}
        onChange={(value) => setGender(value)}
      />
      <FormBirthday onChange={handleBirthdayChange} />
      <Button width="200px" onClick={handleRegister}>
        ログイン
      </Button>
    </div>
  );
}
