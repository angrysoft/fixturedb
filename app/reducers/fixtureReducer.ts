import { Action } from ".";

export type FixtureTypeLight = {
  ID: number,
  name: string,
  manufacture: {
    ID: number,
    name: string,
  },
  type: string,
  weight: number,
  power: number,
  powerPassage: boolean,
  connector: Array<{ID: number, name: string}>,
  powerPlug: {
    ID: number,
    type: string,
  }
};

export type FixtureTypeLed = {
  ID: number,
  name: string,
  manufacture: {
    ID: number,
    name: string,
  },
  type: string,
  weight: number,
  power: number,
  powerPassage: boolean,
  connector: Array<{ID: number, name: string}>,
  powerPlug: {
    ID: number,
    type: string,
  }
  width: number,
  height: number,
  resolutionH: number,
  resolutionV: number,
};

export type fixtureState = {
   light: Array<FixtureTypeLight>,
   led: Array<FixtureTypeLed>,
   isLoading: boolean,
}


const fixtureReducer = (state: fixtureState, action: Action): fixtureState => {
  switch (action.type) {
    case 'FIXTURE_LIST_LOADED':
      return {
        ...state,
        isLoading: false,
        light: action.payload.light || [],
        led: action.payload.led || [],
      };
    
    case 'FIXTURE_SEARCH_CALL':
      return {
        ...state,
        isLoading: true,
      }
    
    case 'FIXTURE_LIST_CLEAR':
      return {
        ...state,
        isLoading: false,
        light: [],
        led: [],
      }

    default:
      return state;
  }
};

export {fixtureReducer};
export type userReducerType = typeof fixtureReducer;
