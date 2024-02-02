"use client";
import React, { createContext, useContext, useReducer } from "react";

interface Props {
  children: React.ReactNode;
}

export interface IHome {
  selectedTagId: string | null;
}

const initialState: IHome = {
  selectedTagId: null,
};

const HomeContext = createContext<IHome | null>(null);
const HomeDispatchContext = createContext<React.Dispatch<any> | null>(null);

export default function HomeContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  return (
    <HomeContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>
        {children}
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
}

function homeReducer(state: IHome, action: any) {
  switch (action.type) {
    case "SET_SELECTED_TAG_ID":
      return {
        ...state,
        selectedTagId: action.payload,
      };
    default:
      return state;
  }
}

export const homeActions = {
  setSelectedTagId: (payload: string) => ({
    type: "SET_SELECTED_TAG_ID",
    payload,
  }),
};

export const useHome = () => {
  return useContext(HomeContext);
};
export const useHomeDispatch = () => {
  return useContext(HomeDispatchContext);
};
