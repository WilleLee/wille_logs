import connectDB from "@/_libs/connectDB";
import Thread from "@/_models/ThreadModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { text, tags, book } = await request.json();
  await connectDB();
  await Thread.create({ text, tags, book });
  return NextResponse.json({
    message: "Thread added successfully ✅",
    status: 200,
  });
}
