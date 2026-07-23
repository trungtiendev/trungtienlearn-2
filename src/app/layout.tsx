import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrungTienLearn - Học tập & Bán sản phẩm số",
  description:
    "Nền tảng học trực tuyến và mua bán sản phẩm số. Khóa học, ebook, template chất lượng cao.",
  keywords: ["học online", "khóa học", "sản phẩm số", "ebook", "template"],
  authors: [{ name: "TrungTienLearn" }],
  openGraph: {
    title: "TrungTienLearn",
    description: "Nền tảng học trực tuyến và mua bán sản phẩm số",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
