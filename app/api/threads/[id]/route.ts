import connectMongo from "@libs/connectMongo";
import threadModel from "@libs/models/threadModel";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const { id } = params;
    const thread = await threadModel
      .findById(id)
      .then((data) => data)
      .catch(() => null);
    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }
    return NextResponse.json(thread, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "undefined error" }, { status: 500 });
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
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Thread deleted" }, { status: 200 });
  } catch (_) {
    return NextResponse.json({ error: "" }, { status: 500 });
  }
}
