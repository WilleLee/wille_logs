import connectMongo from "@libs/connectMongo";
import threadModel from "@libs/models/threadModel";
import { IBook } from "@libs/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();

    // const threads = await threadModel.find({}).sort({ createdAt: -1 });
    const threads = await threadModel.countDocuments();

    console.log("threads at api", threads);

    return NextResponse.json(threads);
  } catch (err) {
    return NextResponse.json(null, {
      status: 500,
      statusText:
        "예상치 못한 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.",
    });
  }
}

// interface PostRequest extends NextRequest {
//   json: () => Promise<{
//     text: string;
//     tags?: string[];
//     book: IBook;
//   }>;
// }

export async function POST({ json }: NextRequest) {
  try {
    await connectMongo();
    const { text, tags, book } = await json();
    console.log(tags);
    const newThread = await threadModel.create({
      text,
      tags: [],
      book,
    });
    return NextResponse.json(newThread, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "예상치 못한 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.",
      },
      {
        status: 500,
      },
    );
  }
}
