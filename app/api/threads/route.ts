import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import threadModel from "@libs/models/threadModel";
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
    const {
      text,
      // tags,
      book,
    } = await json();

    const newThread = await threadModel
      .create({
        text,
        tags: [],
        book,
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
