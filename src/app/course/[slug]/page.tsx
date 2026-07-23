import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Users,
  Star,
  PlayCircle,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select(`*, profiles(full_name, avatar_url), modules(id, title, description, position, lessons(id, title, description, video_url, duration_seconds, is_preview, position))`)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !course) notFound();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary/8 via-background to-secondary/8 border-b">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link href="/courses" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Quay lại danh sách khóa học
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold">{course.title}</h1>
                <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {course.students_count || 0} học viên
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {course.rating_avg || "0.0"} ({course.rating_count || 0} đánh giá)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {course.duration_minutes ? `${Math.floor(course.duration_minutes / 60)} giờ` : ""}
                </span>
                <span className="badge badge-primary capitalize">{course.level}</span>
              </div>

              {/* Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold mb-3">Yêu cầu tiên quyết</h2>
                  <ul className="space-y-2">
                    {course.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learning Objectives */}
              {course.learning_objectives && course.learning_objectives.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold mb-3">Bạn sẽ học được gì</h2>
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

            {/* Right — Purchase Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-xl space-y-4">
                <div>
                  <div className="text-3xl font-bold font-display text-primary">
                    {course.price > 0 ? formatPrice(course.price) : "Miễn phí"}
                  </div>
                  {course.original_price && (
                    <div className="text-sm text-muted-foreground line-through mt-1">
                      {formatPrice(course.original_price)}
                    </div>
                  )}
                  {course.original_price && course.price < course.original_price && (
                    <div className="mt-1 inline-block bg-destructive/10 text-destructive text-xs font-bold px-2 py-0.5 rounded-full">
                      Giảm {Math.round((1 - Number(course.price) / Number(course.original_price)) * 100)}%
                    </div>
                  )}
                </div>

                <Button className="w-full h-12 btn-gradient-primary text-base font-medium gap-2">
                  {course.price > 0 ? "🛒 Mua khóa học" : "🎓 Đăng ký miễn phí"}
                </Button>

                <div className="space-y-2.5 text-sm">
                  {[
                    { icon: PlayCircle, text: `${course.lessons_count || 0} bài giảng` },
                    { icon: Clock, text: course.duration_minutes ? `${Math.floor(course.duration_minutes / 60)} giờ nội dung` : "" },
                    { icon: CheckCircle2, text: "Truy cập trọn đời" },
                    { icon: CheckCircle2, text: "Chứng nhận hoàn thành" },
                    { icon: CheckCircle2, text: "Cập nhật nội dung miễn phí" },
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

      {/* Curriculum */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold mb-6">Chương trình học</h2>
        {!course.modules || course.modules.length === 0 ? (
          <p className="text-muted-foreground">Chưa có nội dung chương trình.</p>
        ) : (
          <div className="space-y-3">
            {course.modules
              .sort((a: any, b: any) => a.position - b.position)
              .map((module: any) => (
                <details
                  key={module.id}
                  className="rounded-xl border bg-card overflow-hidden shadow-sm group"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-muted/50 transition-colors list-none">
                    <div className="flex items-center gap-3">
                      <span className="badge badge-primary">Bài {module.position}</span>
                      <h3 className="font-display font-semibold">{module.title}</h3>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {module.lessons?.length || 0} bài học
                    </span>
                  </summary>
                  {module.lessons && module.lessons.length > 0 && (
                    <div className="border-t divide-y mx-5">
                      {module.lessons
                        .sort((a: any, b: any) => a.position - b.position)
                        .map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center gap-3 py-3">
                            {lesson.is_preview ? (
                              <PlayCircle className="h-4 w-4 text-green-500 shrink-0" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                            )}
                            <span className="flex-1 text-sm">{lesson.title}</span>
                            <span className="text-xs text-muted-foreground tabular-nums">
                              {lesson.duration_seconds
                                ? `${Math.floor(lesson.duration_seconds / 60)}:${(lesson.duration_seconds % 60).toString().padStart(2, "0")}`
                                : ""}
                            </span>
                            {lesson.is_preview && (
                              <span className="badge badge-success text-[10px]">Xem trước</span>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </details>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
