import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export function MyProducts({ userId }: { userId: string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Sản phẩm của tôi</h2>
        <Link href="/dashboard/products/new" className="text-sm text-primary hover:underline">
          + Thêm sản phẩm
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">
        Bạn chưa có sản phẩm nào.{" "}
        <Link href="/dashboard/products/new" className="text-primary hover:underline">
          Tạo sản phẩm đầu tiên →
        </Link>
      </p>
    </div>
  );
}
