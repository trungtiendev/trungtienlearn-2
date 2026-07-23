import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(`*, categories(name), profiles(full_name, avatar_url)`)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) notFound();

  // Increment views
  await supabase
    .from("posts")
    .update({ views_count: post.views_count + 1 })
    .eq("id", post.id);

  return (
    <div className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Quay lại blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          {post.categories?.name && (
            <span className="inline-block badge badge-primary mb-4">{post.categories.name}</span>
          )}
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-muted-foreground">
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
            className="w-full h-64 sm:h-80 object-cover rounded-xl mb-8 shadow-lg"
          />
        )}

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share */}
        <div className="mt-12 pt-6 border-t flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Chia sẻ bài viết:</span>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            Chia sẻ
          </Button>
        </div>
      </article>
    </div>
  );
}
