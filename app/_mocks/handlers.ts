import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/threads", () => {
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
  http.get("/api/tags", () => {
    return HttpResponse.json({
      data: [
        {
          _id: "1",
          name: "tag1",
        },
        {
          _id: "2",
          name: "tag2",
        },
      ],
      message: "",
      status: 200,
    });
  }),
];
