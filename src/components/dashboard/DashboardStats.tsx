import { BookOpen, ShoppingBag, FileText, Users } from "lucide-react";

interface DashboardStatsProps {
  ordersCount: number;
  enrollmentsCount: number;
}

export function DashboardStats({ ordersCount, enrollmentsCount }: DashboardStatsProps) {
  const stats = [
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      label: "Khóa học đang học",
      value: enrollmentsCount.toString(),
      color: "bg-primary/10",
    },
    {
      icon: <ShoppingBag className="h-5 w-5 text-green-600" />,
      label: "Đơn hàng",
      value: ordersCount.toString(),
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      label: "Bài viết",
      value: "0",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: <Users className="h-5 w-5 text-amber-600" />,
      label: "Học viên",
      value: "0",
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className={`rounded-xl border p-5 ${stat.color} bg-card`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-background">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
