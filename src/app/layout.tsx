import "./globals.css";
import "./reset.css";

import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { AuthProvider, useAuth } from "./auth-provider";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "heewon",
  description: "heewon's playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={notoSansJP.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
