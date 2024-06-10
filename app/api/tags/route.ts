import connectMongo from "@libs/connectMongo";
import tagModel from "@libs/models/tagModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const tags = await tagModel.find({}).sort({
      name: 1,
    });
    return NextResponse.json(tags);
  } catch (err) {
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText:
          "예상치 못한 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.",
      },
    );
  }
}
