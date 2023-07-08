import { Action } from "../../reducers";
import { tableReducer, tableState } from "../../reducers/tableReducer";


export type AdminState = {
  table: tableState,
}

const combineReducers = () => {
  return (state: AdminState, action: Action) => {
    return {
      ...state,
      table: tableReducer(state["table"], action),
    };
  };
};


export default combineReducers();


export type ReducerType = typeof combineReducers;