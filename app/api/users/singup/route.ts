import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import { isEmailFormat } from "@libs/formats";
import userModel from "@libs/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, nickname } = await req.json();
    const isValidSecret = await handleCheckSecret(req);
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
    const createdUser = await userModel
      .create({
        email,
        password,
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
    return NextResponse.json(createdUser, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: errors.UNDEFINED.message },
      { status: errors.UNDEFINED.code },
    );
  }
}

async function handleCheckSecret(req: NextRequest) {
  const signInSecret = process.env.SIGN_IN_SECRET;
  const { secret } = await req.json();
  if (secret !== signInSecret) {
    return false;
  }
  return true;
}
