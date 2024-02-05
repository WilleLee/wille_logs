"use client";

import React, {
  AllHTMLAttributes,
  ButtonHTMLAttributes,
  Dispatch,
  createContext,
  useContext,
  useReducer,
} from "react";
import OutlinedButton from "@components/buttons/OutlinedButton";
import { ITag } from "@models/TagModel";
import styles from "./tagsListView.module.scss";

type TagsListState = {
  showAll: boolean;
};

const initialListState: TagsListState = {
  showAll: false,
};

const TagsListContext = createContext<TagsListState>(initialListState);
const TagsListDispatchContext = createContext<Dispatch<any>>(() => {});

const tagsListReduceer = (state: any, action: any) => {
  switch (action.type) {
    case "TOGGLE_SHOW_ALL":
      return { ...state, showAll: !state.showAll };
    default:
      return state;
  }
};
interface TagsListWrapperProps extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function TagsListWrapper({
  children,
  ...props
}: TagsListWrapperProps) {
  const [state, dispatch] = useReducer(tagsListReduceer, initialListState);
  return (
    <TagsListContext.Provider value={state}>
      <TagsListDispatchContext.Provider value={dispatch}>
        <div className={styles.wrapper} {...props}>
          {children}
        </div>
      </TagsListDispatchContext.Provider>
    </TagsListContext.Provider>
  );
}

export const useTagsListState = () => {
  return useContext(TagsListContext);
};

export const useTagsListDispatch = () => {
  return useContext(TagsListDispatchContext);
};

interface TagsListViewProps extends AllHTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  listLength: number;
}

export const TagsListView = React.memo(function TagsListView({
  children,
  listLength,
  ...props
}: TagsListViewProps) {
  const { showAll } = useTagsListState();
  return (
    <ul
      className={`${styles.ul} ${listLength <= 3 || showAll ? styles.isActive : ""}`}
      {...props}
    >
      {children}
    </ul>
  );
});

interface TagsItemViewProps extends AllHTMLAttributes<HTMLLIElement> {
  tag: ITag;
  handleClickTag: (tagId: string) => void;
}

export const TagsItemView = React.memo(function TagsItemView({
  tag,
  handleClickTag,
  ...props
}: TagsItemViewProps) {
  return (
    <li 
    className={styles.li}
    
    onClick={() => handleClickTag(tag._id as string)} {...props}>
      <OutlinedButton aria-label={`view threads about ${tag.name} tag`}>
        {tag.name}
      </OutlinedButton>
    </li>
  );
});

interface TagsShowAllButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  listLength: number;
}

export const TagsShowAllButton = React.memo(function TagsShowAllButton({
  listLength,
  ...props
}: TagsShowAllButtonProps) {
  const dispatch = useTagsListDispatch();
  return (
    <button
      className={`${styles.showAllButton} ${listLength <= 3 ? styles.hidden : ""}`}
      aria-label="show all tags"
      {...props}
      onClick={() => dispatch({ type: "TOGGLE_SHOW_ALL" })}
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
