"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - replace with Supabase fetch
const posts = [
  {
    id: 1,
    title: "Hướng dẫn NextJS 14: App Router và Server Components",
    excerpt: "Tìm hiểu về những tính năng mới nhất của NextJS 14 với App Router và Server Components.",
    category: "NextJS",
    date: "2026-07-20",
    readTime: "8 phút đọc",
    author: "Trung Trần",
  },
  {
    id: 2,
    title: "Supabase vs Firebase: So sánh Backend-as-a-Service 2026",
    excerpt: "Phân tích chi tiết ưu nhược điểm của Supabase và Firebase để chọn giải pháp phù hợp.",
    category: "Backend",
    date: "2026-07-18",
    readTime: "12 phút đọc",
    author: "Trung Trần",
  },
  {
    id: 3,
    title: "10 mẹo tối ưu hiệu suất React mà bạn nên biết",
    excerpt: "Tổng hợp các kỹ thuật tối ưu hóa hiệu suất ứng dụng React phổ biến nhất.",
    category: "React",
    date: "2026-07-15",
    readTime: "6 phút đọc",
    author: "Trung Trần",
  },
];

export function LatestBlogPosts() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Bài viết mới nhất</h2>
            <p className="text-muted-foreground mt-2">
              Chia sẻ kiến thức về lập trình và công nghệ
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog" className="gap-2">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="group card-hover bg-card rounded-xl border p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("vi-VN")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2">
                bởi {post.author}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
