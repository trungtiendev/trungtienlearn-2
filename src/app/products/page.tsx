import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ShoppingBag, Star, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function ProductsPage() {
  const supabase = await createClient();

  // Fetch active products
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      *,
      profiles (full_name)
    `)
    .eq("status", "active")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Sản phẩm số</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Template, ebook, UI kit và các sản phẩm số chất lượng cao
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["Tất cả", "Template", "Ebook", "UI Kit", "Course Access"].map((type) => (
            <Button
              key={type}
              variant={type === "Tất cả" ? "default" : "outline"}
              size="sm"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {error || !products || products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">Chưa có sản phẩm nào.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group card-hover bg-card rounded-xl border overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 flex items-center justify-center">
                  <span className="text-6xl opacity-40">📦</span>
                  {product.file_type && (
                    <span className="absolute top-3 right-3 bg-background/90 text-xs font-medium px-2 py-1 rounded-full uppercase">
                      {product.file_type}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {product.short_description || product.description}
                  </p>

                  <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {product.rating_avg || "0.0"} ({product.rating_count || 0})
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" />
                      {product.sales_count || 0} đã bán
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.original_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground mt-1">
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
