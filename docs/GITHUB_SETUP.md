# Hướng dẫn thiết lập GitHub Repository

## 1. Tạo repository trên GitHub

1. Truy cập [github.com/new](https://github.com/new)
2. Đặt tên repository: `trungtienlearn`
3. Chọn **Private** hoặc **Public**
4. **Không** tick "Add a README" (đã có sẵn)
5. Nhấn **Create repository**

## 2. Cấu hình local

```bash
# Di chuyển vào thư mục dự án
cd D:\Projects\agnes-ai\trungtienlearn

# Khởi tạo git (nếu chưa)
git init

# Thêm remote repository
git remote add origin https://github.com/YOUR_USERNAME/trungtienlearn.git

# Thêm tất cả files
git add .

# Commit lần đầu
git commit -m "Initial commit: TrungTienLearn project setup"

# Push lên GitHub
git branch -M main
git push -u origin main
```

## 3. File `.env.local` (không commit lên Git)

Tạo file `.env.local` trong thư mục dự án:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# VNPay
VNPAY_PAYMENT_URL=https://test.vnpay.vn/cgi-bin/payment.vnp
VNPAY_RETURN_URL=http://localhost:3000/payment/vnpay-return
VNPAY_TMN_CODE=YOUR_TMN_CODE
VNPAY_HASH_SECRET=YOUR_HASH_SECRET

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ **QUAN TRỌNG**: File `.env.local` đã được thêm vào `.gitignore`. Không bao giờ commit file này lên GitHub.

## 4. Các bước tiếp theo

- [ ] Setup Supabase project
- [ ] Chạy migration SQL để tạo database schema
- [ ] Cấu hình Stripe và VNPay
- [ ] Deploy lên Vercel
