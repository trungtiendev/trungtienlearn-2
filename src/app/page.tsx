import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShoppingBag,
  Users,
  Star,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured data in parallel
  const [{ data: featuredCourses }, { data: featuredProducts }, { data: latestPosts }] =
    await Promise.all([
      supabase
        .from("courses")
        .select(`*, profiles(full_name)`)
        .eq("status", "published")
        .eq("is_featured", true)
        .limit(3),
      supabase
        .from("products")
        .select(`*, profiles(full_name)`)
        .eq("status", "active")
        .eq("is_featured", true)
        .limit(3),
      supabase
        .from("posts")
        .select(`*, categories(name), profiles(full_name)`)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3),
    ]);

  return (
    <div className="flex flex-col">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left — Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                <Zap className="h-3.5 w-3.5 text-accent" />
                <span>Học tập hiệu quả hơn với công nghệ AI</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Học lập trình{" "}
                  <span className="gradient-text">từ con số 0</span>
                  <br />
                  đến chuyên nghiệp
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto lg:mx-0">
                  Hàng trăm khóa học chất lượng cao, template và tài nguyên
                  miễn phí. Cộng đồng developer Việt Nam đang cùng nhau phát triển.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/courses">
                  <Button size="lg" className="btn-gradient-primary text-base gap-2 px-6">
                    Khám phá khóa học
                    <ArrowRight className="h-4.5 w-4.5" />
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline" className="text-base px-6">
                    Đọc blog
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Chứng nhận hoàn thành</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Hỗ trợ 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Hoàn tiền 30 ngày</span>
                </div>
              </div>
            </div>

            {/* Right — Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1: Courses */}
              <div className="card-hover rounded-xl border bg-card p-5 shadow-card col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">Khóa học online</h3>
                    <p className="text-xs text-muted-foreground">
                      Từ cơ bản đến nâng cao
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold font-display">
                    {featuredCourses?.length || 0}+
                  </span>
                  <span className="text-sm text-muted-foreground">khóa học</span>
                </div>
              </div>

              {/* Card 2: Products */}
              <div className="card-hover rounded-xl border bg-card p-5 shadow-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 mb-3">
                  <ShoppingBag className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-2xl font-bold font-display">
                  {featuredProducts?.length || 0}+
                </div>
                <div className="text-sm text-muted-foreground">sản phẩm số</div>
              </div>

              {/* Card 3: Blog */}
              <div className="card-hover rounded-xl border bg-card p-5 shadow-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-3">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <div className="text-2xl font-bold font-display">500+</div>
                <div className="text-sm text-muted-foreground">bài viết</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "10,000+", label: "Học viên", icon: Users },
              { value: "200+", label: "Khóa học", icon: GraduationCap },
              { value: "500+", label: "Bài viết", icon: BookOpen },
              { value: "4.8", label: "Đánh giá TB", icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold font-display gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED COURSES ==================== */}
      <section className="section">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Khóa học nổi bật</h2>
            <p className="text-muted-foreground mt-2">
              Những khóa học được yêu thích nhất
            </p>
          </div>
          <Link href="/courses">
            <Button variant="ghost" className="gap-1 text-sm">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {(!featuredCourses || featuredCourses.length === 0) ? (
          <div className="text-center py-12 rounded-xl border bg-muted/30">
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">Chưa có khóa học nào.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course: any) => (
              <Link
                key={course.id}
                href={`/course/${course.slug}`}
                className="group card-hover rounded-xl border bg-card overflow-hidden shadow-card"
              >
                <div className="h-44 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                  <GraduationCap className="h-16 w-16 text-primary/30" />
                  <span className="absolute top-3 right-3 badge badge-primary capitalize">
                    {course.level}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-display font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.short_description || course.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.students_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {course.rating_avg || "0.0"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-lg font-bold text-primary">
                      {course.price > 0 ? formatPrice(course.price) : "Miễn phí"}
                    </span>
                    {course.original_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(course.original_price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="section section-alt">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Sản phẩm số</h2>
            <p className="text-muted-foreground mt-2">Template, ebook, UI kit chất lượng cao</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="gap-1 text-sm">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {(!featuredProducts || featuredProducts.length === 0) ? (
          <div className="text-center py-12 rounded-xl border bg-muted/30">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">Chưa có sản phẩm nào.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product: any) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group card-hover rounded-xl border bg-card overflow-hidden shadow-card"
              >
                <div className="h-44 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center relative">
                  <ShoppingBag className="h-16 w-16 text-green-600/20 dark:text-green-400/20" />
                  {product.file_type && (
                    <span className="absolute top-3 right-3 badge badge-secondary uppercase">
                      {product.file_type}
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-display font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.short_description || product.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {product.rating_avg || "0.0"}
                    </span>
                    <span className="flex items-center gap-1">
                      {product.sales_count || 0} đã bán
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.original_price && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ==================== LATEST BLOG POSTS ==================== */}
      <section className="section">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Bài viết mới nhất</h2>
            <p className="text-muted-foreground mt-2">
              Chia sẻ kiến thức về lập trình & công nghệ
            </p>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="gap-1 text-sm">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {(!latestPosts || latestPosts.length === 0) ? (
          <div className="text-center py-12 rounded-xl border bg-muted/30">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">Chưa có bài viết nào.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post: any) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="group card-hover rounded-xl border bg-card overflow-hidden shadow-card flex flex-col"
              >
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-5 flex-1 flex flex-col space-y-3">
                  {post.categories?.name && (
                    <span className="badge badge-primary self-start">
                      {post.categories.name}
                    </span>
                  )}
                  <h3 className="font-display font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>{post.profiles?.full_name || "Tác giả"}</span>
                    <span>
                      {new Date(post.published_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="section">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 sm:p-12 text-center text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Sẵn sàng bắt đầu hành trình?
            </h2>
            <p className="text-white/80 text-lg">
              Đăng ký tài khoản miễn phí để truy cập hàng trăm khóa học và tài nguyên chất lượng.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 text-base gap-2 px-8">
                  Đăng ký miễn phí
                  <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8">
                  Khám phá khóa học
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
