import { Action } from "./";
import { fixtureReducer, fixtureState } from "./fixtureReducer";
import { tableReducer, tableState } from "./tableReducer";


export type RootState = {
  table: tableState,
  fixture: fixtureState,
}


const combineReducers = () => {
  return (state: RootState, action: Action) => {
    return {
      ...state,
      table: tableReducer(state["table"], action),
      fixture: fixtureReducer(state["fixture"], action),
    };
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;