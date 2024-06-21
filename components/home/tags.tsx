import { getTags } from "@libs/data";
import Tag from "./tag";
import { ReactNode } from "react";

export default async function Tags() {
  const { data, isSuccess } = await getTags();

  if (!isSuccess || data === null) {
    return <p>error</p>;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      {data.map((tag) => (
        <Tag key={tag._id} tag={tag} />
      ))}
    </Wrapper>
  );
}

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
