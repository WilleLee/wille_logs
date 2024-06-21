import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import tagModel from "@libs/models/tagModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    await connectMongo();

    const tag = await tagModel
      .findById(id)
      .then((data) => data)
      .catch(() => null);

    if (!tag) {
      return NextResponse.json(
        {
          error: "태그를 찾을 수 없습니다.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(tag.name, { status: 200 });
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
