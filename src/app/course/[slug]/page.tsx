import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Users, Star, PlayCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch course with modules and lessons
  const { data: course, error } = await supabase
    .from("courses")
    .select(`
      *,
      profiles (full_name, avatar_url),
      modules (
        id, title, description, position,
        lessons (
          id, title, description, video_url, duration_seconds, is_preview, position
        )
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/courses" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" />
            Quay lại khóa học
          </Link>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground mt-3 text-lg">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students_count || 0} học viên
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {course.rating_avg || "0.0"} ({course.rating_count || 0} đánh giá)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration_minutes ? `${Math.floor(course.duration_minutes / 60)} giờ` : ""}
                </span>
                <span className="capitalize">{course.level}</span>
              </div>

              {/* Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-3">Yêu cầu tiên quyết</h2>
                  <ul className="space-y-2">
                    {course.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learning Objectives */}
              {course.learning_objectives && course.learning_objectives.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-3">Bạn sẽ học được gì</h2>
                  <ul className="space-y-2">
                    {course.learning_objectives.map((obj: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Card - Purchase / Enroll */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-lg">
                <div className="text-3xl font-bold text-primary">
                  {course.price > 0 ? formatPrice(course.price) : "Miễn phí"}
                </div>
                {course.original_price && (
                  <div className="text-sm text-muted-foreground line-through mt-1">
                    {formatPrice(course.original_price)}
                  </div>
                )}
                
                <Button className="w-full mt-4" size="lg">
                  {course.price > 0 ? "Mua khóa học" : "Đăng ký miễn phí"}
                </Button>
                
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PlayCircle className="h-4 w-4" />
                    {course.lessons_count || 0} bài giảng
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {course.duration_minutes ? `${Math.floor(course.duration_minutes / 60)} giờ` : ""} nội dung
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    Truy cập trọn đời
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    Chứng nhận hoàn thành
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Chương trình học</h2>
        {!course.modules || course.modules.length === 0 ? (
          <p className="text-muted-foreground">Chưa có nội dung chương trình.</p>
        ) : (
          <div className="space-y-4">
            {course.modules
              .sort((a: any, b: any) => a.position - b.position)
              .map((module: any) => (
                <div key={module.id} className="rounded-xl border bg-card overflow-hidden">
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Bài {module.position}: {module.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {module.lessons?.length || 0} bài học
                    </span>
                  </div>
                  {module.lessons && module.lessons.length > 0 && (
                    <div className="border-t divide-y">
                      {module.lessons
                        .sort((a: any, b: any) => a.position - b.position)
                        .map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center gap-3 px-5 py-3">
                            {lesson.is_preview ? (
                              <PlayCircle className="h-4 w-4 text-green-500 shrink-0" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                            )}
                            <span className="flex-1 text-sm">{lesson.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {lesson.duration_seconds ? `${Math.floor(lesson.duration_seconds / 60)}:${(lesson.duration_seconds % 60).toString().padStart(2, "0")}` : ""}
                            </span>
                            {lesson.is_preview && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Xem trước
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
