export const errors = {
  TAG_NOT_FOUND: {
    code: 404,
    message: "기존 태그 정보를 불러오는 데 실패했습니다.",
  },
  THREAD_NOT_DELETED: {
    code: 400,
    message: "스레드를 삭제하는 데 실패했습니다.",
  },
  THREAD_NOT_CREATED: {
    code: 400,
    message: "스레드를 생성하는 데 실패했습니다.",
  },
  THREAD_NOT_FOUND: {
    code: 404,
    message: "스레드를 불러오는 데 실패했습니다.",
  },
  UNDEFINED: {
    code: 500,
    message: "예상치 못한 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.",
  },
};
