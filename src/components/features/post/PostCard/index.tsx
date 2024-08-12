import React from "react";

import Button from "@/components/basic/Button";
import { Post } from "@/types/post";

import UserProfile from "../../user/UserProfile";
import styles from "./post-card.module.css";

type PostCardProps = {
  post: Post;
  isMine: boolean;
  onDelete: (postId: string) => void;
};

export default function PostCard({ post, isMine, onDelete }: PostCardProps) {
  return (
    <div className={styles.postCard}>
      <UserProfile user={post.writer} />
      <div className={styles.content}>{post.content}</div>
      <div className={styles.footer}>
        <div className={styles.dateInfo}>
          作成日: {new Date(post.createdAt).toLocaleString("ja-JP")}
        </div>
        {isMine && <Button onClick={() => onDelete(post.id)}>削除</Button>}
      </div>
    </div>
  );
}
