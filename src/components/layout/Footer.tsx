import Link from "next/link";
import { Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                TT
              </div>
              <span className="text-xl font-bold">
                TrungTien<span className="text-primary">Learn</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Nền tảng học trực tuyến và mua bán sản phẩm số hàng đầu Việt Nam. 
              Khoá học chất lượng cao, ebook và template chuyên nghiệp.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary">Khóa học</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Sản phẩm số</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-primary">Đăng nhập</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Việt Nam
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +84 xxx xxx xxx
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@trungtienlearn.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TrungTienLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
