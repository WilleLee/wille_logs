import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD as string;
    const { password } = await request.json();
    if (!password || typeof password !== "string") {
      return NextResponse.json({
        message: "Type the password 🤷🏻‍♂️",
        status: 400,
      });
    }
    if (password !== adminPassword) {
      return NextResponse.json({
        message: "Your are not Wille 😡",
        status: 400,
      });
    }
    return NextResponse.json({
      message: "Welcome, Wille 😎",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong 😢",
      status: 500,
    });
  }
}
