"use client";

import Link from "next/link";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - replace with Supabase fetch
const courses = [
  {
    id: 1,
    title: "JavaScript Mastery - Từ cơ bản đến nâng cao",
    description: "Học JavaScript từ con số 0 đến khi có thể xây dựng ứng dụng web chuyên nghiệp.",
    image: "/placeholder-course-1.jpg",
    instructor: "Trung Trần",
    price: 499000,
    originalPrice: 999000,
    rating: 4.9,
    students: 1234,
    lessons: 48,
    duration: "24h",
    level: "Mới bắt đầu",
    tag: "hot",
  },
  {
    id: 2,
    title: "React & NextJS - Fullstack Development",
    description: "Xây dựng ứng dụng fullstack hiện đại với React, NextJS và Supabase.",
    image: "/placeholder-course-2.jpg",
    instructor: "Trung Trần",
    price: 699000,
    originalPrice: 1299000,
    rating: 4.8,
    students: 856,
    lessons: 64,
    duration: "32h",
    level: "Nâng cao",
    tag: "new",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Thiết kế giao diện người dùng chuyên nghiệp với Figma và nguyên tắc UX.",
    image: "/placeholder-course-3.jpg",
    instructor: "Trung Trần",
    price: 399000,
    originalPrice: 799000,
    rating: 4.7,
    students: 2100,
    lessons: 36,
    duration: "18h",
    level: "Trung bình",
    tag: null,
  },
];

export function FeaturedCourses() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Khóa học nổi bật</h2>
            <p className="text-muted-foreground mt-2">
              Những khóa học được yêu thích nhất
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/courses" className="gap-2">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="group card-hover bg-card rounded-xl border overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                <span className="text-6xl opacity-30">📚</span>
                {course.tag === "hot" && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    HOT
                  </span>
                )}
                {course.tag === "new" && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    MỚI
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-background/90 text-xs font-medium px-2 py-1 rounded-full">
                  {course.level}
                </span>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.students.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div>
                    <span className="text-lg font-bold text-primary">
                      {course.price.toLocaleString("vi-VN")}₫
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {course.originalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-1">
                  bởi {course.instructor}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
