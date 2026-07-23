import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Clock, Users, Star, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function CoursesPage() {
  const supabase = await createClient();

  // Fetch published courses
  const { data: courses, error } = await supabase
    .from("courses")
    .select(`
      *,
      profiles (full_name)
    `)
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Khóa học</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Nâng cao kỹ năng với khóa học chất lượng cao
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["Tất cả", "Mới bắt đầu", "Trung bình", "Nâng cao"].map((level) => (
            <Button
              key={level}
              variant={level === "Tất cả" ? "default" : "outline"}
              size="sm"
            >
              {level}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        {error || !courses || courses.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">Chưa có khóa học nào.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: any) => (
              <Link
                key={course.id}
                href={`/course/${course.slug}`}
                className="group card-hover bg-card rounded-xl border overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                  <span className="text-6xl opacity-30">🎓</span>
                  <span className="absolute top-3 right-3 bg-background/90 text-xs font-medium px-2 py-1 rounded-full capitalize">
                    {course.level}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {course.short_description || course.description}
                  </p>

                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration_minutes ? `${Math.floor(course.duration_minutes / 60)}h` : ""}
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

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-lg font-bold text-primary">
                      {course.price > 0 ? formatPrice(course.price) : "Miễn phí"}
                    </span>
                    {course.original_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(course.original_price)}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground mt-1">
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
