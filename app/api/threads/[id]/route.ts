import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import threadModel from "@libs/models/threadModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const { id } = params;
    const thread = await threadModel
      .findById(id)
      .then((data) => data)
      .catch(() => null);
    if (!thread) {
      return NextResponse.json(
        { error: errors.THREAD_NOT_FOUND.message },
        { status: errors.THREAD_NOT_FOUND.code },
      );
    }
    return NextResponse.json(thread, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: errors.UNDEFINED.message },
      { status: errors.UNDEFINED.code },
    );
  }
}

export async function DELETE(_: any, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const { id } = params;

    let deletedCount = await threadModel
      .deleteOne({ _id: id })
      .then((data) => data.deletedCount)
      .catch(() => 0);

    if (deletedCount < 1) {
      return NextResponse.json(
        { error: errors.THREAD_NOT_DELETED.message },
        { status: errors.THREAD_NOT_DELETED.code },
      );
    }

    return NextResponse.json(null, { status: 200 });
  } catch (_) {
    return NextResponse.json(
      { error: errors.UNDEFINED.message },
      { status: errors.UNDEFINED.code },
    );
  }
}
