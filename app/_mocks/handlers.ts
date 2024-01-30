import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/threads", () => {
    console.log("called!!");
    return HttpResponse.json({
      data: [
        {
          _id: "1",
          text: "test text",
          tags: ["tag1", "tag2"],
          book: {
            title: "book1",
            author: "author1",
            page: 1,
          },
        },
      ],
      message: "",
      status: 200,
    });
  }),
];
