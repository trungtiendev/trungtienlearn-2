import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { MyCourses } from "@/components/dashboard/MyCourses";
import { MyProducts } from "@/components/dashboard/MyProducts";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch dashboard data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      courses (title, slug, cover_image)
    `)
    .eq("user_id", user.id);

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader user={user} profile={profile} />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Chào mừng, {profile?.full_name || user.email}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Quản lý khóa học, đơn hàng và sản phẩm của bạn
          </p>
        </div>

        {/* Stats */}
        <DashboardStats 
          ordersCount={orders?.length || 0}
          enrollmentsCount={enrollments?.length || 0}
        />

        <div className="grid gap-8 mt-8 lg:grid-cols-2">
          {/* Recent Orders */}
          <RecentOrders orders={orders || []} />

          {/* My Courses */}
          <MyCourses enrollments={enrollments || []} />
        </div>

        {/* My Products (if creator) */}
        {(profile?.role === "creator" || profile?.role === "admin") && (
          <div className="mt-8">
            <MyProducts userId={user.id} />
          </div>
        )}
      </main>
    </div>
  );
}
