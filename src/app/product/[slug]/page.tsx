import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Star, FileText, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(`*, profiles(full_name), reviews(id, rating, comment, created_at, profiles(full_name))`)
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !product) notFound();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link href="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Quay lại sản phẩm
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {product.rating_avg || "0.0"} ({product.rating_count || 0} đánh giá)
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.sales_count || 0} đã bán
                </span>
                {product.file_type && (
                  <span className="badge badge-secondary uppercase text-[10px]">
                    {product.file_type}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <FileText className="h-5 w-5 text-primary mb-2" />
                <div className="text-sm font-medium">Định dạng</div>
                <div className="text-sm text-muted-foreground capitalize">{product.file_type || "Nhiều định dạng"}</div>
              </div>
              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <Download className="h-5 w-5 text-green-600 mb-2" />
                <div className="text-sm font-medium">Kích thước</div>
                <div className="text-sm text-muted-foreground">
                  {product.file_size_mb ? `${product.file_size_mb} MB` : "Không giới hạn"}
                </div>
              </div>
            </div>

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Đánh giá ({product.reviews.length})</h2>
                <div className="space-y-3">
                  {product.reviews.slice(0, 5).map((review: any) => (
                    <div key={review.id} className="rounded-xl border bg-card p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{review.profiles?.full_name || "Ẩn danh"}</span>
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
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

          {/* Right — Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-xl space-y-4">
              <div>
                <div className="text-3xl font-bold font-display text-primary">
                  {formatPrice(product.price)}
                </div>
                {product.original_price && (
                  <>
                    <div className="text-sm text-muted-foreground line-through mt-1">
                      {formatPrice(product.original_price)}
                    </div>
                    <div className="mt-1 inline-block bg-destructive/10 text-destructive text-xs font-bold px-2 py-0.5 rounded-full">
                      Giảm {Math.round((1 - Number(product.price) / Number(product.original_price)) * 100)}%
                    </div>
                  </>
                )}
              </div>

              <Button className="w-full h-12 btn-gradient-primary text-base font-medium gap-2">
                <ShoppingCart className="h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>

              <div className="space-y-2.5 text-sm">
                {[
                  { icon: Download, text: "Tải xuống ngay sau khi mua" },
                  { icon: FileText, text: `Định dạng: ${product.file_type || "Nhiều định dạng"}` },
                  { icon: Star, text: "Hoàn tiền trong 30 ngày" },
                  { icon: Download, text: "Hỗ trợ cập nhật miễn phí" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground">
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
