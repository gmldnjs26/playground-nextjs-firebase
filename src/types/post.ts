export type Post = {
  id: string;
  writer: {
    id: string;
    name: string;
    profileIconUrl: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
};
