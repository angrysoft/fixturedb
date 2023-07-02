import { Action } from ".";

export interface FixtureObject {
  id: number;
  model:string;
  fixtureType: { id:number, name: string};
  manufacture: {
    id: number,
    name: string,
  };
  weight: number;
  power: number;
  tags: Array<Tag>;
}

interface Tag {
    id:number;
    name:string;
}

export type fixtureState = {
  fixtures: Array<FixtureObject>,
  clear: boolean,
  isLoading: boolean,
}


const fixtureReducer = (state: fixtureState, action: Action): fixtureState => {
  switch (action.type) {
    case 'FIXTURE_LIST_LOADED':
      return {
        ...state,
        isLoading: false,
        fixtures: [...action.payload.data]|| [],
        clear: false,
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
        fixtures: [],
        clear: true,
      }

    default:
      return state;
  }
};

export {fixtureReducer};
export type userReducerType = typeof fixtureReducer;
