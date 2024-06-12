import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import tagModel from "@libs/models/tagModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const tags = await tagModel
      .find({})
      .sort({
        name: 1,
      })
      .then((data) => data)
      .catch(() => null);
    if (tags === null) {
      return NextResponse.json(
        {},
        {
          status: errors.TAG_NOT_FOUND.code,
          statusText: errors.TAG_NOT_FOUND.message,
        },
      );
    }
    return NextResponse.json(tags, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {},
      {
        status: errors.UNDEFINED.code,
        statusText: errors.UNDEFINED.message,
      },
    );
  }
}
