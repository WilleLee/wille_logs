import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import tagModel from "@libs/models/tagModel";
import threadModel from "@libs/models/threadModel";
import userModel from "@libs/models/userModel";
import { ITag } from "@libs/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();

    const threads = await threadModel
      .find({})
      .sort({
        createdAt: -1,
      })
      .then((data) => data)
      .catch(() => null);
    if (threads === null) {
      return NextResponse.json(
        {
          error: errors.THREAD_NOT_FOUND.message,
        },
        {
          status: errors.THREAD_NOT_FOUND.code,
        },
      );
    }

    return NextResponse.json(threads, {
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

export async function POST({ json }: NextRequest) {
  try {
    await connectMongo();
    const { text, tags, book, userId } = await json();

    let newTags = [];
    const existingTags = await tagModel
      .find({})
      .then((data) => data as ITag[])
      .catch(() => null);

    if (!text || !tags || !book) {
      return NextResponse.json(
        {
          error: errors.UNFULFILLED_INPUT.message,
        },
        {
          status: errors.UNFULFILLED_INPUT.code,
        },
      );
    }

    if (existingTags === null) {
      return NextResponse.json(
        {
          error: errors.TAG_NOT_FOUND.message,
        },
        {
          status: errors.TAG_NOT_FOUND.code,
        },
      );
    }

    for (let i = 0; i < tags.length; i++) {
      const tagName = tags[i] as string;
      const existingTag = existingTags.find(
        (t) => t.name === tagName.toUpperCase(),
      );
      if (!existingTag) {
        const newTag = await tagModel.create({
          name: tagName,
        });
        newTags.push(newTag._id);
      } else {
        newTags.push(existingTag._id);
      }
    }

    const newThread = await threadModel
      .create({
        text,
        tags: newTags,
        book,
        creator: userId,
      })
      .then((data) => data)
      .catch(() => null);

    if (newThread === null) {
      return NextResponse.json(
        {
          error: errors.THREAD_NOT_CREATED.message,
        },
        {
          status: errors.THREAD_NOT_CREATED.code,
        },
      );
    }

    await userModel.findByIdAndUpdate(userId, {
      $push: {
        threads: newThread._id,
      },
    });

    return NextResponse.json(newThread, { status: 201 });
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
