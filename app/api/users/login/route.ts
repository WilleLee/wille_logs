import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import userModel from "@libs/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("email", email, "password", password);
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
      })
      .then((data) => data)
      .catch(() => null);

    if (!foundUser) {
      return NextResponse.json(
        {
          error: "회원정보를 확인해주세요. (1)",
        },
        { status: 401 },
      );
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      foundUser.password,
    );
    if (!isCorrectPassword) {
      return NextResponse.json(
        {
          error: "회원정보를 확인해주세요. (2)",
        },
        { status: 401 },
      );
    }

    const AUTH_SECRET = process.env.AUTH_SECRET as string;

    const accessToken = jwt.sign(
      {
        email: foundUser.email,
      },
      AUTH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return NextResponse.json(
      {
        email: foundUser.email,
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
      {
        status: errors.UNDEFINED.code,
      },
    );
  }
}
