import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import userModel from "@libs/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "이메일과 비밀번호를 모두 입력해주세요.",
        },
        { status: 401 },
      );
    }
    await connectMongo();
    const foundUser = await userModel
      .findOne({
        email,
        password,
      })
      .then((data) => data)
      .catch(() => null);

    if (!foundUser) {
      return NextResponse.json(
        {
          error: "회원정보를 확인해주세요.",
        },
        { status: 401 },
      );
    }

    return NextResponse.json(foundUser, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: errors.UNDEFINED.message,
      },
      {
        status: errors.UNDEFINED.code,
      },
    );
  }
}
