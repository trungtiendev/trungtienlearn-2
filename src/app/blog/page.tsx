import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BlogPage() {
  const supabase = await createClient();

  // Fetch published posts with category and author info
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      *,
      categories (name),
      profiles (full_name)
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Chia sẻ kiến thức về lập trình và công nghệ
          </p>
        </div>

        {/* Posts Grid */}
        {error || !posts || posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Chưa có bài viết nào.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="group card-hover bg-card rounded-xl border overflow-hidden flex flex-col"
              >
                {post.cover_image && (
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 relative">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    {post.categories?.name && (
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {post.categories.name}
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.published_at).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      ~5 phút đọc
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    bởi {post.profiles?.full_name || "Tác giả"}
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
