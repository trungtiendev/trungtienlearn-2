"use client";

import Link from "next/link";
import { ArrowRight, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - replace with Supabase fetch
const products = [
  {
    id: 1,
    name: "Bộ template Portfolio chuyên nghiệp",
    description: "20+ template portfolio đẹp cho designer và developer",
    price: 199000,
    originalPrice: 399000,
    rating: 4.9,
    sales: 342,
    type: "template",
    format: "Figma + HTML",
  },
  {
    id: 2,
    name: "Ebook: Lập trình Fullstack với NextJS",
    description: "Hướng dẫn chi tiết xây dựng ứng dụng fullstack từ A-Z",
    price: 149000,
    originalPrice: 299000,
    rating: 4.8,
    sales: 567,
    type: "ebook",
    format: "PDF",
  },
  {
    id: 3,
    name: "UI Kit - Dashboard Components",
    description: "100+ components dashboard đẹp mắt, responsive",
    price: 249000,
    originalPrice: 499000,
    rating: 4.7,
    sales: 234,
    type: "ui-kit",
    format: "Figma + React",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Sản phẩm số nổi bật</h2>
            <p className="text-muted-foreground mt-2">
              Template, ebook, UI kit chất lượng cao
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/products" className="gap-2">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group card-hover bg-card rounded-xl border overflow-hidden"
            >
              <div className="relative h-44 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 flex items-center justify-center">
                <span className="text-5xl opacity-40">
                  {product.type === "template" ? "🎨" : product.type === "ebook" ? "📖" : "🧩"}
                </span>
                <span className="absolute top-3 right-3 bg-background/90 text-xs font-medium px-2 py-1 rounded-full">
                  {product.format}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">
                    {product.type === "template" ? "Template" : product.type === "ebook" ? "Ebook" : "UI Kit"}
                  </span>
                </div>
                
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" />
                    {product.sales} đã bán
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-lg font-bold text-primary">
                    {product.price.toLocaleString("vi-VN")}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
