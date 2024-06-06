import React, { AllHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./tagsView.module.scss";
import { ITag } from "@/models/TagModel";
import OutlinedButton from "@/components/buttons/OutlinedButton";

interface TagsViewProps extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function TagsView({ children, ...props }: TagsViewProps) {
  return (
    <div className={styles.wrapper} {...props}>
      {children}
    </div>
  );
}

interface TagsViewListProps extends AllHTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  isActive: boolean;
}

TagsView.List = React.memo(function List({
  children,
  isActive = false,
  ...props
}: TagsViewListProps) {
  return (
    <ul
      className={`${styles.list} ${isActive ? styles.active : ""}`}
      {...props}
    >
      {children}
    </ul>
  );
});

interface TagsViewItemProps extends AllHTMLAttributes<HTMLLIElement> {
  tag: ITag;
  isSelected: boolean;
  handleClickTag: (tagId: string) => void;
}

TagsView.Item = React.memo(function Item({
  tag,
  isSelected,
  handleClickTag,
  ...props
}: TagsViewItemProps) {
  return (
    <li
      className={`${styles.item} ${isSelected ? styles.selected : ""}`}
      {...props}
    >
      <OutlinedButton
        aria-label={`view threads about ${tag.name} tag`}
        onClick={() => {
          handleClickTag(tag._id as string);
        }}
        isSelected={isSelected}
      >
        {tag.name}
      </OutlinedButton>
    </li>
  );
});

interface TagsViewShowAllButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isHidden: boolean;
}

TagsView.ShowAllButton = React.memo(function ShowAllButton({
  isHidden = true,
  ...props
}: TagsViewShowAllButtonProps) {
  return (
    <button
      className={`${styles.showAllButton} ${isHidden ? styles.hidden : ""}`}
      aria-label="show all tags"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="rgb(var(--icon))"
        viewBox="0 0 16 16"
      >
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
      </svg>
    </button>
  );
});
