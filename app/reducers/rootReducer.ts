import { Action } from "./";
import { fixtureReducer, fixtureState } from "./fixtureReducer";
import { userReducer, userState } from "./userReducer";
import { viewReducer, viewState } from "./viewReducer";


export type RootState = {
  user: userState,
  fixture: fixtureState,
  view: viewState,
}

export type State = userState;

const combineReducers = () => {
  return (state: RootState, action: Action) => {
    return {
      ...state,
      user: userReducer(state["user"], action),
      fixture: fixtureReducer(state["fixture"], action),
      view: viewReducer(state["view"], action)
    };
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;