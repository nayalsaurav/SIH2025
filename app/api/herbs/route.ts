import { NextResponse } from "next/server";

// GET: List all herbs
export async function GET() {
  return NextResponse.json([
    { id: 1, name: "Ashwagandha", scientific: "Withania somnifera" },
    { id: 2, name: "Tulsi", scientific: "Ocimum sanctum" },
  ]);
}

// POST: Add a new herb
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: "Herb added", herb: body });
}
