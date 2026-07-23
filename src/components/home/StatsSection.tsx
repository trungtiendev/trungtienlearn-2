"use client";

import { Users, BookOpen, GraduationCap, Award } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: "10,000+",
    label: "Học viên",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-green-600" />,
    value: "200+",
    label: "Khóa học",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-purple-600" />,
    value: "50+",
    label: "Sản phẩm số",
  },
  {
    icon: <Award className="h-8 w-8 text-amber-600" />,
    value: "4.8",
    label: "Đánh giá TB",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
