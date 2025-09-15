import { NextResponse } from "next/server";

// GET: Fetch all collection events
export async function GET() {
  return NextResponse.json([
    {
      id: "evt_123",
      herb: "Ashwagandha",
      gps: { lat: 28.7041, lng: 77.1025 },
      collector: "Farmer A",
      timestamp: new Date().toISOString(),
    },
  ]);
}

// POST: Record a new collection event
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    message: "Collection event recorded",
    event: body,
  });
}
