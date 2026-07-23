import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  ShoppingBag,
  Star,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(`*, profiles(full_name)`)
    .eq("status", "active")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-4xl font-bold">Sản phẩm số</h1>
          <p className="text-lg text-muted-foreground">
            Template, ebook, UI kit và các tài nguyên developer chất lượng cao
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-4 rounded-xl border bg-card shadow-sm">
          <Filter className="h-4 w-4 text-muted-foreground mr-1" />
          {[
            { label: "Tất cả", active: true },
            { label: "Template" },
            { label: "Ebook" },
            { label: "UI Kit" },
          ].map((filter) => (
            <Button
              key={filter.label}
              variant={filter.active ? "default" : "outline"}
              size="sm"
              className={`rounded-full text-sm ${filter.active ? "btn-gradient-primary" : ""}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {error || !products || products.length === 0 ? (
          <div className="text-center py-20 rounded-xl border bg-card">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">Chưa có sản phẩm nào</h2>
            <p className="text-muted-foreground mb-4">Hãy quay lại sau!</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group card-hover rounded-xl border bg-card overflow-hidden shadow-card"
              >
                {/* Cover */}
                <div className="relative h-44 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center">
                  <ShoppingBag className="h-14 w-14 text-green-600/20 dark:text-green-400/20" />
                  {product.file_type && (
                    <span className="absolute top-3 right-3 badge badge-secondary uppercase text-[10px]">
                      {product.file_type}
                    </span>
                  )}
                  {product.original_price && product.price < product.original_price && (
                    <span className="absolute top-3 left-3 badge badge-destructive text-[10px]">
                      -{Math.round((1 - Number(product.price) / Number(product.original_price)) * 100)}%
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-display font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.short_description || product.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {product.rating_avg || "0.0"} ({product.rating_count || 0})
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" />
                      {product.sales_count || 0} đã bán
                    </span>
                  </div>

                  {/* Price */}
                  <div className="pt-3 border-t flex items-center gap-2">
                    <span className="text-lg font-bold font-display text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.original_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    bởi {product.profiles?.full_name || "Tác giả"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
