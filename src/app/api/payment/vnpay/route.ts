import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, totalAmount, bankCode, orderInfo } = body;

    // VNPay payment initiation
    const ipAddr = req.headers.get("x-forwarded-for") || "127.0.0.1";
    
    const vnpUrl = process.env.VNPAY_PAYMENT_URL!;
    const tmnCode = process.env.VNPAY_TMN_CODE!;
    const hashSecret = process.env.VNPAY_HASH_SECRET!;

    const createDate = new Date().toISOString().replace(/\.\d{3}Z$/, "");
    const params: Record<string, string> = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Amount: Math.round(totalAmount * 100).toString(),
      vnp_CurrCode: "VND",
      vnp_BankCode: bankCode || "NCB",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo || "Thanh toán sản phẩm số",
      vnp_Locale: "vn",
      vnp_CreateDate: createDate,
      vnp_ExpireDate: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 min expiry
      vnp_IpAddr: ipAddr,
    };

    // Sort params and create hash
    const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {} as Record<string, string>);

    const signData = new URLSearchParams(sortedParams).toString();
    const hmac = crypto.createHmac("sha512", hashSecret);
    const signature = hmac.update(signData).digest("hex");

    const checkoutUrl = `${vnpUrl}?${signData}&vnp_SecureHash=${signature}`;

    return NextResponse.json({ url: checkoutUrl });
  } catch (error: unknown) {
    console.error("VNPay error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
