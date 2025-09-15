import { NextResponse } from "next/server";

// GET: Fetch all certificates
export async function GET() {
  return NextResponse.json([
    {
      id: "cert_001",
      batchId: "batch_001",
      type: "DNA Barcode",
      status: "Valid",
    },
  ]);
}

// POST: Upload a new certificate
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    message: "Certificate uploaded",
    certificate: body,
  });
}
