import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");

  if (vnp_ResponseCode === "00") {
    // Payment successful - update order status in database
    return NextResponse.redirect(
      new URL(`/payment/success?order=${vnp_TxnRef}`, req.url)
    );
  } else {
    return NextResponse.redirect(
      new URL(`/payment/cancel?order=${vnp_TxnRef}`, req.url)
    );
  }
}
