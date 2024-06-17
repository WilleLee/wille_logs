import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import { isEmailFormat } from "@libs/formats";
import userModel from "@libs/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, password, nickname, secret } = await req.json();
    const isValidSecret = await handleCheckSecret(secret);
    // 회원가입 시크릿 확인
    if (!isValidSecret) {
      return NextResponse.json(
        {
          error: errors.NO_SECRET.message,
        },
        { status: errors.NO_SECRET.code },
      );
    }
    // 이메일, 비밀번호, 닉네임 입력되었는지 확인
    if (!email || !password || !nickname) {
      return NextResponse.json(
        {
          error: "이메일과 비밀번호, 닉네임을 모두 입력해주세요.",
        },
        { status: 401 },
      );
    }
    const isValidEmail = isEmailFormat(email);
    // 이메일 형식 확인
    if (!isValidEmail) {
      return NextResponse.json(
        {
          error: "올바른 이메일 형식이 아닙니다.",
        },
        { status: 401 },
      );
    }
    await connectMongo();
    const existringUser = await userModel.findOne({
      email,
    });
    // 이미 가입된 이메일인지 확인
    if (existringUser !== null && existringUser !== undefined) {
      return NextResponse.json(
        {
          error: "이미 가입된 이메일입니다.",
        },
        { status: 403 },
      );
    }

    const hashRound = Math.floor(Math.random() * 10) + 1;
    const hashedPassword = await bcrypt.hash(password, hashRound);

    const createdUser = await userModel
      .create({
        email,
        password: hashedPassword,
        nickname,
      })
      .then((data) => data)
      .catch(() => null);

    // 회원가입 실패
    if (!createdUser) {
      return NextResponse.json(
        {
          error: "회원가입에 실패했습니다.",
        },
        { status: 400 },
      );
    }

    // 회원가입 성공
    return NextResponse.json(
      {
        email: createdUser.email,
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: errors.UNDEFINED.message },
      { status: errors.UNDEFINED.code },
    );
  }
}

async function handleCheckSecret(secret: string) {
  const signupSecret = process.env.SIGNUP_SECRET;
  if (secret !== signupSecret) {
    return false;
  }
  return true;
}