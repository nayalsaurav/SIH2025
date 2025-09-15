import { NextResponse } from "next/server";

// GET: List all users
export async function GET() {
  return NextResponse.json([
    { id: "user_001", role: "Farmer", name: "Ramesh Kumar" },
    { id: "user_002", role: "Lab", name: "BioTest Labs" },
  ]);
}

// POST: Add new user
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: "User added", user: body });
}
