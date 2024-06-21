"use client";
import React, { Dispatch, createContext, useContext, useReducer } from "react";

interface Props {
  children: React.ReactNode;
}

export interface IHome {
  selectedTagId: string | null;
  isHomeReady: boolean;
}

const initialState: IHome = {
  selectedTagId: null,
  isHomeReady: false,
};

const HomeContext = createContext<IHome>(initialState);
const HomeDispatchContext = createContext<Dispatch<any>>(() => {});

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
    case "SET_IS_HOME_READY":
      return {
        ...state,
        isHomeReady: action.payload,
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
  setIsHomeReady: (payload: boolean) => ({
    type: "SET_IS_HOME_READY",
    payload,
  }),
};

export const useHome = () => {
  return useContext(HomeContext);
};
export const useHomeDispatch = () => {
  return useContext(HomeDispatchContext);
};
