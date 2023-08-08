import "./globals.css";
import Nav from "../components/Nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Aldo Schumann",
  description: "Vercel Familiarization Exercise 2023",
};

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params?: { id: number };
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex mx-auto md:gap-4 w-fit">{props.children}</body>
    </html>
  );
}
