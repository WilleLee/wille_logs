import { errors } from "@constants/errors";
import connectMongo from "@libs/connectMongo";
import tagModel from "@libs/models/tagModel";
import threadModel from "@libs/models/threadModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@api/route";
import mongoose from "mongoose";

// 스레드 작성
export async function POST(req: NextRequest) {
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

    const {
      text,
      tags = [],
      book: { title, author, page },
    } = (await req.json()) as {
      text: string;
      tags: string[];
      book: {
        title: string;
        author: string;
        page: number;
      };
    };

    if (!text) {
      return NextResponse.json(
        {
          error: "내용을 입력해주세요.",
        },
        { status: 400 },
      );
    }

    if (!title || !author || !page) {
      return NextResponse.json(
        {
          error: "책 정보를 모두 입력해주세요.",
        },
        { status: 400 },
      );
    }

    await connectMongo();

    const tagIds: mongoose.Schema.Types.ObjectId[] = [];

    for (let i = 0; i < tags.length; i++) {
      const tagName = tags[i];
      const foundTag = await tagModel.findOne({ name: tagName });

      if (!foundTag) {
        const createdTag = await tagModel.create({ name: tagName });
        tagIds.push(createdTag._id);
      } else {
        tagIds.push(foundTag._id);
        await tagModel.findByIdAndUpdate(foundTag._id, {
          $inc: {
            usedCount: 1,
          },
        });
      }
    }

    const createdThread = await threadModel
      .create({
        text,
        tags: tagIds,
        creator: decodedId,
        book: {
          title,
          author,
          page,
        },
      })
      .then((data) => data)
      .catch(() => null);

    if (!createdThread) {
      return NextResponse.json(
        {
          error: "스레드 작성에 실패했습니다.\n잠시 후 다시 시도해주세요.",
        },
        {
          status: errors.UNDEFINED.code,
        },
      );
    }

    for (let i = 0; i < tagIds.length; i++) {
      const tagId = tagIds[i];
      await tagModel.findByIdAndUpdate(tagId, {
        $push: {
          threads: createdThread._id,
        },
      });
    }

    return NextResponse.json(createdThread, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: errors.UNDEFINED.message,
      },
      { status: errors.UNDEFINED.code },
    );
  }
}
