import connectDB from "@libs/connectDB";
import Tag from "@models/TagModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const tags = await Tag.find({});
    console.log(tags);
    return NextResponse.json({
      data: tags,
      message: "",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
