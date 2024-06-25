import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import tagModel from "@libs/models/tagModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectMongo();

    // sort by usedCount
    const tags = (await tagModel.find()).sort(
      (a, b) => b.usedCount - a.usedCount,
    );

    return NextResponse.json(tags, {
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
