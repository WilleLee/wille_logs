import connectDB from "@/_libs/connectDB";
import Tag, { ITag } from "@/_models/TagModel";
import Thread from "@/_models/ThreadModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const tag = searchParams.get("tag");
    // 해당 tag를 갖는 thread들을 찾는다.
    const threads = await Thread.find(
      tag ? { tags: { $in: [tag] } } : {},
    ).populate("tags");
    console.log("threads", threads);
    threads.map((t) => console.log(t.tags));
    return NextResponse.json({
      data: threads,
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

export async function POST(request: NextRequest) {
  try {
    const { text, tags, book } = await request.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({
        message: "Please type your thread text",
        status: 400,
      });
    }
    if (
      !book ||
      !book.title ||
      typeof book.title !== "string" ||
      !book.author ||
      typeof book.author !== "string" ||
      !book.page ||
      typeof book.page !== "number"
    ) {
      return NextResponse.json({
        message: "Please leave a book title, author, and page number",
        status: 400,
      });
    }
    await connectDB();

    let newTags: ITag[] = [];
    const existingTags = await Tag.find({});

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const existingTag = existingTags.find(
        (t: any) => t.name === tag.toUpperCase(),
      );
      if (existingTag) {
        newTags.push(existingTag._id);
      } else {
        const newTag = await Tag.create({ name: tag });
        // console.log("new tag", newTag);
        newTags.push(newTag._id);
      }
    }

    // console.log("new tags", newTags);

    await Thread.create({ text, tags: newTags, book });
    return NextResponse.json({
      message: "Thread added successfully ✅",
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
