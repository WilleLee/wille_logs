import { errors } from "@constants/errors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const isValid = await middleware(req);
    if (!isValid) {
      return NextResponse.json(
        {
          error: "not hello world",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        hello: "world",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
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

async function middleware(req: NextRequest) {
  const { hello } = await req.json();
  if (typeof hello !== "string" || hello !== "world") {
    return false;
  }
  return true;
}
