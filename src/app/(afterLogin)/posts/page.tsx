"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { useAuth } from "@/app/auth-provider";
import Button from "@/components/basic/Button";
import PostCard from "@/components/features/post/PostCard";
import PostWriteModal from "@/components/features/post/PostWriteModal";
import { firestore } from "@/plugins/firebase";
import { Post } from "@/types/post";

import styles from "./posts-page.module.css";

export default function PostsPage() {
  const auth = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleWrite = async (content: string) => {
    try {
      await addDoc(collection(firestore, "posts"), {
        writer: {
          id: auth?.user?.uid ?? "",
          name: auth?.user?.name ?? "",
          profileIconUrl: auth?.user?.profileIconUrl ?? "",
        },
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      await handleFetchPosts();
    } catch (err) {
      alert("投稿に失敗しました");
      console.error(err);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      await deleteDoc(postDocRef);
      await handleFetchPosts();
    } catch (err) {
      alert("削除に失敗しました");
      console.error(err);
    }
  };

  const handleFetchPosts = async () => {
    const postsQuery = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(postsQuery);

    setPosts(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Post))
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await handleFetchPosts();
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>投稿一覧</h1>
      <div className={styles.header}>
        <Button onClick={() => setModalOpen(true)}>投稿する</Button>
      </div>
      <div className={styles.postList}>
        {posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              isMine={auth.user?.uid === post.writer.id}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
      {modalOpen && (
        <PostWriteModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleWrite}
        />
      )}
    </div>
  );
}
