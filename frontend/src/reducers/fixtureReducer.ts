import { Action } from ".";

export type FixtureModel = {
  ID: number,
  name: string,
  manufacture: {
    ID: number,
    name: string,
  },
  type: {
    ID: number,
    name: string,
  },
  weight: number,
  power: number,
  PowerPassage: boolean,
  Connector: Array<{ID: number, name: string}>,
  PowerPlug: {
    ID: number,
    type: string,
  }
};

export type fixtureState = {
   list: Array<FixtureModel>,
   isLoading: boolean,
}


const fixtureReducer = (state: fixtureState, action: Action): fixtureState => {
  switch (action.type) {
    case 'FIXTURE_LIST_LOADED':
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };

    default:
      return state;
  }
};

export {fixtureReducer};
export type userReducerType = typeof fixtureReducer;
