import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD as string;
    const { password } = await request.json();
    const hashRounds = Math.floor(Math.random() * 10) + 1;
    const accessSecret = process.env.ACCESS_SECRET as string;
    const hashedAccessSecret = await bcrypt.hash(accessSecret, hashRounds);

    if (!password || typeof password !== "string") {
      return NextResponse.json({
        message: "Type the password 🤷🏻‍♂️",
        status: 400,
      });
    }
    if (password !== adminPassword) {
      return NextResponse.json({
        message: "You are not Wille 😡",
        status: 400,
      });
    }

    return NextResponse.json({
      data: hashedAccessSecret,
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
