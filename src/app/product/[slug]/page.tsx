import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Star, FileText, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch single product
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      profiles (full_name, avatar_url),
      reviews (
        id, rating, comment, created_at,
        profiles (full_name)
      )
    `)
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link href="/products" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Quay lại sản phẩm
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {product.rating_avg || "0.0"} ({product.rating_count || 0} đánh giá)
              </span>
              <span className="text-sm text-muted-foreground">
                {product.sales_count || 0} đã bán
              </span>
            </div>

            <p className="text-muted-foreground mt-6 text-lg">{product.description}</p>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-card">
                <FileText className="h-5 w-5 text-primary mb-2" />
                <div className="text-sm font-medium">Định dạng</div>
                <div className="text-sm text-muted-foreground uppercase">{product.file_type || "Nhiều định dạng"}</div>
              </div>
              <div className="rounded-lg border p-4 bg-card">
                <Download className="h-5 w-5 text-green-600 mb-2" />
                <div className="text-sm font-medium">Kích thước</div>
                <div className="text-sm text-muted-foreground">
                  {product.file_size_mb ? `${product.file_size_mb} MB` : "Không giới hạn"}
                </div>
              </div>
            </div>

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Đánh giá</h2>
                <div className="space-y-4">
                  {product.reviews.slice(0, 5).map((review: any) => (
                    <div key={review.id} className="rounded-lg border p-4 bg-card">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{review.profiles?.full_name || "Ẩn danh"}</span>
                        <span className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
                      )}
                      <div className="text-xs text-muted-foreground mt-2">
                        {new Date(review.created_at).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Card - Purchase */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-lg">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>
              {product.original_price && (
                <div className="text-sm text-muted-foreground line-through mt-1">
                  {formatPrice(product.original_price)}
                </div>
              )}

              {/* Discount badge */}
              {product.original_price && product.price < product.original_price && (
                <div className="mt-2 inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                  Giảm {Math.round((1 - Number(product.price) / Number(product.original_price)) * 100)}%
                </div>
              )}

              <Button className="w-full mt-4 gap-2" size="lg">
                <ShoppingCart className="h-4 w-4" />
                Thêm vào giỏ hàng
              </Button>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Download className="h-4 w-4" />
                  Tải xuống ngay sau khi mua
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Định dạng: {product.file_type || "Nhiều định dạng"}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  Hoàn tiền trong 30 ngày
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
