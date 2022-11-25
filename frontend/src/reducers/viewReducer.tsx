import { Action } from ".";

export type viewState = {
  viewSearch: boolean;
}

const viewReducer = (state: viewState, action: Action) => {
  switch (action.type) {
    case "SEARCH_BAR_STATE": {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

export {viewReducer}
export type viewReducerType = typeof viewReducer;