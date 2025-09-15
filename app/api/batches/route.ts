import { NextResponse } from "next/server";

// GET: List all batches
export async function GET() {
  return NextResponse.json([
    { id: "batch_001", herb: "Ashwagandha", status: "Processing" },
  ]);
}

// POST: Create a new batch
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: "Batch created", batch: body });
}
