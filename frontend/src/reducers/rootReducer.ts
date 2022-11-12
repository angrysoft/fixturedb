import { Action } from "./";
import { userReducer, userState } from "./userReducer";


export type RootState = {
  user: userState,
}

export type State = userState;

const combineReducers = () => {
  return (state: RootState, action: Action) => {
    return {
      ...state,
      user: userReducer(state["user"], action),
    };
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;