import Link from "next/link";

interface Enrollment {
  course_id: string;
  progress_percentage: number;
  courses?: { title: string; slug: string; cover_image?: string };
}

export function MyCourses({ enrollments }: { enrollments: Enrollment[] }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Khóa học của tôi</h2>
      {enrollments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Bạn chưa enrolled khóa học nào.{" "}
          <Link href="/courses" className="text-primary hover:underline">
            Khám phá khóa học →
          </Link>
        </p>
      ) : (
        <div className="space-y-3">
          {enrollments.map((enrollment) => (
            <div key={enrollment.course_id} className="flex items-center gap-3 py-2 border-b last:border-0">
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {enrollment.courses?.title || "Khóa học"}
                </div>
                <div className="w-full h-2 bg-muted rounded-full mt-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${enrollment.progress_percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-primary">
                {enrollment.progress_percentage.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
