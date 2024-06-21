import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    if (!message || message !== "ping") {
      return NextResponse.json({
        message: "Not a valid message 👎🏻",
        status: 400,
      });
    }
    return NextResponse.json({
      message: "PONG! 🏓",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong 😢",
      status: 500,
    });
  }
}
