import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FI Note",
  description:
    "FI Notes adalah ruang kerja yang bisa terhubung di mana saja dalam membuat pekerjaan lebih baik dan lebih cepat.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.png",
        href: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="Fi-Notes-themes"
        >
          <Navbar />
          <div className="mt-32">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
