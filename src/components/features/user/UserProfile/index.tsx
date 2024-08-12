import Image from "next/image";

import styles from "./user-profile.module.css";

type UserProfileProps = {
  user: {
    name: string;
    profileIconUrl: string;
  };
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className={styles.userProfile}>
      <Image
        className={styles.profileIcon}
        width={45}
        height={45}
        src={user.profileIconUrl || "/images/user.webp"}
        alt={`${user.name}のプロフィール画像`}
      />
      <div>
        <div className={styles.writerName}>{user.name}</div>
      </div>
    </div>
  );
}
