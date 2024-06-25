import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import userModel from "@libs/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { isEmailFormat } from "@libs/formats";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

// get user info
export async function GET() {
  try {
    let decodedUserId = undefined;
    const AUTH_SECRET = process.env.AUTH_SECRET as string;
    const accessToken = cookies().get("access-token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "로그인이 필요한 서비스입니다.",
        },
        { status: 401 },
      );
    }

    jwt.verify(accessToken, AUTH_SECRET, function (err, decoded) {
      if (err) {
        return NextResponse.json(
          {
            error: "회원 인증에 실패했습니다.",
          },
          { status: 401 },
        );
      } else {
        const decodedObj = decoded as { id: string; email: string };
        decodedUserId = decodedObj.id;
      }
    });

    if (!decodedUserId) {
      return NextResponse.json(
        {
          error: "회원 인증에 실패했습니다.",
        },
        { status: 401 },
      );
    }

    await connectMongo();

    const foundUser = await userModel
      .findById(decodedUserId)
      .then((data) => data)
      .catch(() => null);
    if (!foundUser) {
      return NextResponse.json(
        {
          error: "회원 정보를 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        email: foundUser.email,
        nickname: foundUser.nickname,
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

// sign up
export async function POST(req: NextRequest) {
  try {
    const signupSecret = process.env.SIGNUP_SECRET as string;
    const hashRound = Math.floor(Math.random() * 10) + 1;
    const { email, password, passwordConfirm, nickname, secret } =
      (await req.json()) as {
        email: string;
        password: string;
        passwordConfirm: string;
        nickname: string;
        secret: string;
      };
    if (password !== passwordConfirm) {
      return NextResponse.json(
        {
          error: "재확인 비밀번호를 확인해주세요.",
        },
        { status: 401 },
      );
    }
    if (!isEmailFormat(email)) {
      return NextResponse.json(
        {
          error: "이메일 형식이 올바르지 않습니다.",
        },
        {
          status: 403,
        },
      );
    }
    if (!email || email.length < 4 || email.length > 30) {
      return NextResponse.json(
        {
          error: "이메일은 4자 이상 30자 이하로 입력해주세요.",
        },
        {
          status: 403,
        },
      );
    }
    if (!password || password.length < 6 || password.length > 20) {
      return NextResponse.json(
        {
          error: "비밀번호는 6자 이상 20자 이하로 입력해주세요.",
        },
        {
          status: 403,
        },
      );
    }
    if (!nickname || nickname.length < 2 || nickname.length > 10) {
      return NextResponse.json(
        {
          error: "닉네임은 2자 이상 10자 이하로 입력해주세요.",
        },
        {
          status: 403,
        },
      );
    }
    if (signupSecret !== secret) {
      return NextResponse.json(
        {
          error: errors.NO_SECRET.message,
        },
        {
          status: errors.NO_SECRET.code,
        },
      );
    }

    await connectMongo();

    const hashedPassword = await bcrypt.hash(password, hashRound);

    const createdUser = await userModel
      .create({
        email,
        password: hashedPassword,
        nickname,
      })
      .then((data) => data)
      .catch(() => null);

    if (createdUser === null || createdUser === undefined) {
      return NextResponse.json(
        { error: "회원가입에 실패했습니다.\n잠시 후 다시 시도해주세요." },
        { status: 500 },
      );
    }

    return NextResponse.json(null, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: errors.UNDEFINED.message,
      },
      { status: errors.UNDEFINED.code },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    let decodedUserId = undefined;
    const AUTH_SECRET = process.env.AUTH_SECRET as string;
    const accessToken = cookies().get("access-token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "로그인이 필요한 서비스입니다.",
        },
        { status: 401 },
      );
    }

    jwt.verify(accessToken, AUTH_SECRET, function (err, decoded) {
      if (err) {
        return NextResponse.json(
          {
            error: "회원 인증에 실패했습니다.",
          },
          { status: 401 },
        );
      } else {
        const decodedObj = decoded as { id: string; email: string };
        decodedUserId = decodedObj.id;
      }
    });

    if (!decodedUserId) {
      return NextResponse.json(
        {
          error: "회원 인증에 실패했습니다.",
        },
        { status: 401 },
      );
    }

    const { nickname } = (await req.json()) as { nickname: string };

    await connectMongo();

    if (!nickname || nickname.length < 2 || nickname.length > 10) {
      return NextResponse.json(
        {
          error: "닉네임은 2자 이상 10자 이하로 입력해주세요.",
        },
        {
          status: 403,
        },
      );
    }

    const updatedUser = await userModel
      .findOneAndUpdate({ _id: decodedUserId }, { nickname })
      .then((data) => data)
      .catch(() => null);

    if (!updatedUser) {
      return NextResponse.json(
        {
          error: "회원 정보 수정에 실패했습니다.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        email: updatedUser.email,
        nickname: updatedUser.nickname,
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

export async function DELETE() {
  try {
    let decodedUserId = undefined;
    const AUTH_SECRET = process.env.AUTH_SECRET as string;
    const accessToken = cookies().get("access-token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "로그인이 필요한 서비스입니다.",
        },
        { status: 401 },
      );
    }

    jwt.verify(accessToken, AUTH_SECRET, function (err, decoded) {
      if (err) {
        return NextResponse.json(
          {
            error: "회원 인증에 실패했습니다.",
          },
          { status: 401 },
        );
      } else {
        const decodedObj = decoded as { id: string; email: string };
        decodedUserId = decodedObj.id;
      }
    });

    if (!decodedUserId) {
      return NextResponse.json(
        {
          error: "회원 인증에 실패했습니다.",
        },
        { status: 401 },
      );
    }

    await connectMongo();

    await userModel.deleteOne({ _id: decodedUserId });
    return NextResponse.json(null, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: errors.UNDEFINED.message,
      },
      { status: errors.UNDEFINED.code },
    );
  }
}
