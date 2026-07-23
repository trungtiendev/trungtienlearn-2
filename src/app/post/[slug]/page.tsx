import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch single post
  const { data: post, error } = await supabase
    .from("posts")
    .select(`
      *,
      categories (name),
      profiles (full_name, avatar_url)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  // Increment views
  await supabase
    .from("posts")
    .update({ views_count: post.views_count + 1 })
    .eq("id", post.id);

  return (
    <div className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          {post.categories?.name && (
            <span className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
              {post.categories.name}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>
          
          <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.profiles?.full_name || "Tác giả"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.published_at).toLocaleDateString("vi-VN")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              ~5 phút đọc
            </span>
            <span>{post.views_count} lượt xem</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover rounded-xl mb-8"
          />
        )}

        {/* Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
