"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface ITagContext {
  selectedTagId: string | null;
  onReset: () => void;
  onSelect: (id: string) => void;
}

const initialContext: ITagContext = {
  selectedTagId: null,
  onReset: () => {},
  onSelect: () => {},
};

const TagContext = createContext<ITagContext>(initialContext);

export default function TagProvider({ children }: { children: ReactNode }) {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const handleReset = useCallback(() => setSelectedTagId(null), []);
  const handleSelect = useCallback((id: string) => setSelectedTagId(id), []);
  return (
    <TagContext.Provider
      value={{
        selectedTagId,
        onReset: handleReset,
        onSelect: handleSelect,
      }}
    >
      {children}
    </TagContext.Provider>
  );
}

export const useTagContext = () => {
  return useContext(TagContext);
};
