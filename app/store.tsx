'use client'
import React from "react";
import { createContext, useReducer } from "react";
import rootReducer, { RootState } from "./reducers/rootReducer";

const initialState: RootState = {
  user: {
    user: {},
    isLoading: false,
  },
  fixture: {
    light: [],
    led: [],
    isLoading: false,
  },
  view: {
    viewSearch: false,
  }
};

interface IProviderProps {
  children: JSX.Element | JSX.Element[];
}

const Provider = (props: IProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

const AppContext = createContext<{
  state: RootState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export { Provider, AppContext, initialState };