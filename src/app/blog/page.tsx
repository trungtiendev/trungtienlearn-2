import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(`*, categories(name), profiles(full_name)`)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-4xl font-bold">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Chia sẻ kiến thức về lập trình và công nghệ
          </p>
        </div>

        {/* Posts Grid */}
        {error || !posts || posts.length === 0 ? (
          <div className="text-center py-20 rounded-xl border bg-card">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">Chưa có bài viết nào</h2>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="group card-hover rounded-xl border bg-card overflow-hidden shadow-card flex flex-col"
              >
                {/* Cover Image */}
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="h-44 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Calendar className="h-14 w-14 text-primary/20" />
                  </div>
                )}

                {/* Content */}
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

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.published_at).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      ~5 phút đọc
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
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
