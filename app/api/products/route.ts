import { NextResponse } from "next/server";

// GET: List all products
export async function GET() {
  return NextResponse.json([
    {
      id: "prod_001",
      name: "Ashwagandha Capsules",
      batchId: "batch_001",
      qr: "qr_12345",
    },
  ]);
}

// POST: Create a new product
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: "Product created", product: body });
}
