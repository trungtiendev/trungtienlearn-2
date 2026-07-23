"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <Gift className="h-12 w-12 mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Bắt đầu học tập ngay hôm nay!
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Đăng ký tài khoản miễn phí để truy cập hàng trăm khóa học chất lượng cao, 
          sản phẩm số và cộng đồng học tập sôi động.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="/register">
              Đăng ký miễn phí
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 bg-transparent text-white border-white hover:bg-white/10" asChild>
            <Link href="/courses">
              <BookOpen className="h-4 w-4" />
              Khám phá khóa học
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
