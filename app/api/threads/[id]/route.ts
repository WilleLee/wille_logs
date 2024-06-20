import { isAuthenticated } from "@api/route";
import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import tagModel, { TagSchema } from "@libs/models/tagModel";
import threadModel, { ThreadSchema } from "@libs/models/threadModel";
import userModel from "@libs/models/userModel";
import { cookies } from "next/headers";
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

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const accessToken = cookies().get("access-token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "로그인이 필요한 서비스입니다.",
        },
        { status: 401 },
      );
    }

    const decodedId = await isAuthenticated(accessToken);

    if (!decodedId) {
      return NextResponse.json(
        {
          error: "회원 인증에 실패했습니다.",
        },
        { status: 401 },
      );
    }

    const { id } = params;

    await connectMongo();

    const user = await userModel.findById(decodedId);

    const thread = await threadModel.findById(id);

    console.log("thread", thread.creator);
    console.log("user", user._id);

    if (thread.creator.toString() !== user._id.toString()) {
      return NextResponse.json(
        {
          error: "작성자만 삭제할 수 있습니다.",
        },
        {
          status: 401,
        },
      );
    }

    const updatedTags: TagSchema[] = [];
    const { tags: tagIds } = thread as ThreadSchema;

    for (let i = 0; i < tagIds.length; i++) {
      const tagId = tagIds[i];
      const updatedTag = await tagModel.findByIdAndUpdate(tagId, {
        $pull: { threads: id },
      });
      updatedTags.push(updatedTag);
    }
    console.log("updatedTags", updatedTags);

    await threadModel.findByIdAndDelete(id);
    return NextResponse.json(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: errors.UNDEFINED.message },
      { status: errors.UNDEFINED.code },
    );
  }
}
