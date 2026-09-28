import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

/* ── Optimised font loading via next/font ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Researcher AI Agent",
  description:
    "An AI-powered research agent that synthesizes the web into premium executive summaries — powered by LangGraph, Tavily, and LLMs.",
  keywords: [
    "AI research",
    "web synthesis",
    "LangGraph",
    "Tavily",
    "research agent",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Material Symbols — can't be loaded via next/font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
