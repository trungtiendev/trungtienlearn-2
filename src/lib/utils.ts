import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number | string, currency = "VND") {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (currency === "VND") {
    return new Intl.NumberFormat("vi-VN").format(numPrice) + "₫";
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(numPrice);
}

export function formatDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\+/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
