import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Clock,
  Users,
  Star,
  ArrowRight,
  GraduationCap,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select(`*, profiles(full_name)`)
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-4xl font-bold">Khóa học</h1>
          <p className="text-lg text-muted-foreground">
            Nâng cao kỹ năng lập trình với khóa học chất lượng cao
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-4 rounded-xl border bg-card shadow-sm">
          <Filter className="h-4 w-4 text-muted-foreground mr-1" />
          {[
            { label: "Tất cả", active: true },
            { label: "Mới bắt đầu" },
            { label: "Trung bình" },
            { label: "Nâng cao" },
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

        {/* Courses Grid */}
        {error || !courses || courses.length === 0 ? (
          <div className="text-center py-20 rounded-xl border bg-card">
            <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">Chưa có khóa học nào</h2>
            <p className="text-muted-foreground mb-4">Hãy quay lại sau để cập nhật mới nhất!</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: any) => (
              <Link
                key={course.id}
                href={`/course/${course.slug}`}
                className="group card-hover rounded-xl border bg-card overflow-hidden shadow-card"
              >
                {/* Cover */}
                <div className="relative h-44 bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/15 flex items-center justify-center">
                  <GraduationCap className="h-14 w-14 text-primary/25" />
                  <span className="absolute top-3 right-3 badge badge-primary capitalize">
                    {course.level}
                  </span>
                  {course.is_featured && (
                    <span className="absolute top-3 left-3 badge badge-accent">
                      ⭐ Nổi bật
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-display font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.short_description || course.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration_minutes
                        ? `${Math.floor(course.duration_minutes / 60)}h`
                        : "N/A"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.students_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {course.rating_avg || "0.0"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <span className="text-lg font-bold text-primary">
                        {course.price > 0 ? formatPrice(course.price) : "Miễn phí"}
                      </span>
                      {course.original_price && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          {formatPrice(course.original_price)}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Author */}
                  <div className="text-xs text-muted-foreground">
                    bởi {course.profiles?.full_name || "Giảng viên"}
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
