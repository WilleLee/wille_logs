import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import userModel from "@libs/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await new Promise((res) => setTimeout(res, 500));
    const AUTH_SECRET = process.env.AUTH_SECRET as string;
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    if (!email) {
      return NextResponse.json(
        {
          error: "이메일을 입력해주세요.",
        },
        { status: 401 },
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          error: "비밀번호를 입력해주세요.",
        },
        { status: 401 },
      );
    }

    await connectMongo();

    const foundUser = await userModel
      .findOne({ email })
      .then((data) => data)
      .catch(() => null);
    if (foundUser === null || foundUser === undefined) {
      return NextResponse.json(
        {
          error: "일치하는 회원 정보를 찾을 수 없습니다.",
        },
        { status: 401 },
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          error: "일치하는 회원 정보를 찾을 수 없습니다.",
        },
        { status: 401 },
      );
    }
    const accessToken = jwt.sign(
      {
        email: foundUser.email,
        id: foundUser._id,
      },
      AUTH_SECRET,
      {
        expiresIn: "7d",
      },
    );
    return NextResponse.json(
      {
        nickname: foundUser.nickname,
        accessToken,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: errors.UNDEFINED.message,
      },
      { status: errors.UNDEFINED.code },
    );
  }
}
