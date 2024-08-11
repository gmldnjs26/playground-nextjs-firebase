"use client";

import { useAuth } from "@/app/auth-provider";

export default function PostsPage() {
  const auth = useAuth();

  return <div>{auth.user?.email}</div>;
}
