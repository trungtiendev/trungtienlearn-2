import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  GraduationCap,
  ShoppingBag,
  BookOpen,
  Users,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch user data in parallel
  const [{ data: profile }, { data: orders }, { data: enrollments }, { data: posts }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("enrollments")
        .select(`*, courses(title, slug)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("posts")
        .select("id")
        .eq("author_id", user.id),
    ]);

  // Stats
  const totalSpent = orders?.reduce((sum, o) => sum + Number(o.total_amount || 0), 0) || 0;
  const completedOrders = orders?.filter((o) => o.status === "paid").length || 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">
              Chào, {profile?.full_name || user.email?.split("@")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Tổng quan về hoạt động học tập của bạn
            </p>
          </div>
          <Link href="/dashboard/posts/new">
            <Button className="btn-gradient-primary gap-2">
              <BookOpen className="h-4 w-4" />
              Viết bài mới
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            {
              label: "Khóa học đang học",
              value: enrollments?.length || 0,
              icon: GraduationCap,
              color: "primary",
              bg: "bg-primary/10",
              text: "text-primary",
            },
            {
              label: "Đơn hàng",
              value: completedOrders,
              icon: ShoppingBag,
              color: "secondary",
              bg: "bg-secondary/10",
              text: "text-secondary",
            },
            {
              label: "Bài viết",
              value: posts?.length || 0,
              icon: BookOpen,
              color: "accent",
              bg: "bg-accent/10",
              text: "text-accent",
            },
            {
              label: "Tổng chi tiêu",
              value: formatPrice(totalSpent),
              icon: TrendingUp,
              color: "info",
              bg: "bg-info/10",
              text: "text-info",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="card-hover rounded-xl border bg-card p-5 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold font-display mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.bg}`}>
                    <Icon className={`h-5.5 w-5.5 ${stat.text}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Recent Orders */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Đơn hàng gần đây</h2>
              <Link href="/dashboard/orders">
                <Button variant="ghost" size="sm" className="gap-1 text-sm">
                  Xem tất cả
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            {(!orders || orders.length === 0) ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">Chưa có đơn hàng nào</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm font-medium">
                          #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">
                        {formatPrice(Number(order.total_amount))}
                      </span>
                      <span
                        className={`badge ${
                          order.status === "paid"
                            ? "badge-success"
                            : order.status === "pending"
                            ? "badge-accent"
                            : "badge-destructive"
                        }`}
                      >
                        {order.status === "paid"
                          ? "Đã thanh toán"
                          : order.status === "pending"
                          ? "Đang chờ"
                          : "Thất bại"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Quick Actions + Enrollments */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold mb-4">Thao tác nhanh</h2>
              <div className="space-y-2">
                <Link href="/courses">
                  <Button variant="outline" className="w-full justify-start gap-2 h-11">
                    <GraduationCap className="h-4.5 w-4.5" />
                    Khám phá khóa học
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full justify-start gap-2 h-11">
                    <ShoppingBag className="h-4.5 w-4.5" />
                    Mua sản phẩm số
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" className="w-full justify-start gap-2 h-11">
                    <BookOpen className="h-4.5 w-4.5" />
                    Đọc blog
                  </Button>
                </Link>
              </div>
            </div>

            {/* My Courses */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold mb-4">Khóa học của tôi</h2>
              {(!enrollments || enrollments.length === 0) ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    Chưa enrolled khóa học nào
                  </p>
                  <Link href="/courses">
                    <Button size="sm" className="mt-3 btn-gradient-primary">
                      Khám phá ngay
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {enrollments.slice(0, 3).map((enrollment: any) => (
                    <Link
                      key={enrollment.id}
                      href={`/course/${enrollment.courses?.slug}`}
                      className="block rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <p className="text-sm font-medium line-clamp-1">
                        {enrollment.courses?.title}
                      </p>
                      <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${enrollment.progress || 0}%` }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
