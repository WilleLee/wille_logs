import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      hello: "world",
    },
    { status: 200 },
  );
}