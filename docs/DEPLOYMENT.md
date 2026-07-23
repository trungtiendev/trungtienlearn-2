# Hướng dẫn Deploy TrungTienLearn

## Phương pháp 1: Deploy lên Vercel (Khuyến nghị)

### Bước 1: Chuẩn bị Supabase

1. Tạo tài khoản tại [supabase.com](https://supabase.com)
2. Tạo project mới
3. Copy `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Chạy SQL migration:
   - Vào **SQL Editor** trong Supabase Dashboard
   - Copy toàn bộ nội dung file `supabase/migrations/001_initial_schema.sql`
   - Paste và chạy

### Bước 2: Deploy lên Vercel

1. Truy cập [vercel.com/new](https://vercel.com/new)
2. Import repository GitHub `trungtienlearn`
3. Cấu hình Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL=https://trungtienlearn.com
```

4. Nhấn **Deploy**

### Bước 3: Cấu hình Domain

1. Vào **Settings > Domains** trên Vercel
2. Thêm domain `trungtienlearn.com`
3. Cấu hình DNS record theo hướng dẫn của Vercel:
   - **A record**: `76.76.21.21` → `trungtienlearn.com`
   - **CNAME record**: `www` → `cname.vercel-dns.com`

---

## Phương pháp 2: Deploy lên Hosting thông thường (Node.js)

### Yêu cầu
- Server có Node.js 18+
- Domain `trungtienlearn.com` đã trỏ về server

### Các bước

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/trungtienlearn.git
cd trungtienlearn

# Cài đặt dependencies
npm install

# Build project
npm run build

# Chạy production
npm start
```

### Sử dụng PM2 để quản lý process

```bash
# Cài đặt PM2
npm install -g pm2

# Khởi động app
pm2 start npm --name "trungtienlearn" -- start

# Lưu cấu trúc
pm2 save

# Tự khởi động khi reboot
pm2 startup
```

### Cấu hình Nginx (Reverse Proxy)

```nginx
server {
    listen 80;
    server_name trungtienlearn.com www.trungtienlearn.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Phương pháp 3: Deploy lên Docker

### Tạo Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild source only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### Build và chạy

```bash
# Build image
docker build -t trungtienlearn .

# Run container
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=xxx \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx \
  --name trungtienlearn \
  trungtienlearn
```

---

## Checklist trước khi deploy

- [ ] Đã tạo Supabase project và chạy migration SQL
- [ ] Đã cấu hình Stripe account (test mode)
- [ ] Đã cấu hình VNPay account (test mode)
- [ ] Đã set đầy đủ environment variables
- [ ] Đã test local với `npm run dev`
- [ ] Đã build thành công với `npm run build`
- [ ] Domain đã trỏ về hosting
- [ ] SSL certificate đã được kích hoạt
