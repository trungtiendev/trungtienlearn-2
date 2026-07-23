import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_method: string;
  created_at: string;
}

export function RecentOrders({ orders }: { orders: Order[] }) {
  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: "Đang chờ", color: "bg-amber-100 text-amber-800" },
    paid: { label: "Đã thanh toán", color: "bg-green-100 text-green-800" },
    failed: { label: "Thất bại", color: "bg-red-100 text-red-800" },
    refunded: { label: "Đã hoàn tiền", color: "bg-gray-100 text-gray-800" },
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const status = statusMap[order.status] || { label: order.status, color: "bg-gray-100" };
            return (
              <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <div className="text-sm font-medium">#{order.id.slice(0, 8)}</div>
                  <div className="text-xs text-muted-foreground">{order.payment_method}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{formatPrice(order.total_amount)}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Link href="/dashboard/orders" className="text-sm text-primary hover:underline mt-4 block">
        Xem tất cả →
      </Link>
    </div>
  );
}
