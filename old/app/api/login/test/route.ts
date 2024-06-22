import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();
    const accessSecret = process.env.ACCESS_SECRET as string;

    if (!accessToken || typeof accessToken !== "string") {
      return NextResponse.json({
        data: false,
        message: "No accessToken 🤷🏻‍♂️",
        status: 400,
      });
    }

    const isAccepted = await bcrypt.compare(accessSecret, accessToken);

    if (!isAccepted) {
      return NextResponse.json({
        data: false,
        message: "Your are not Wille 😡",
        status: 400,
      });
    }

    return NextResponse.json({
      data: true,
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
