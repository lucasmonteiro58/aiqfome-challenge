import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Ai Que Fome",
  description: "Um app de delivery feito com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <Header />
        <main className="pb-20">{children}</main>
      </body>
    </html>
  );
}
