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
  isSearching: boolean,
  cursor: number,
  oldCursor: number,
  query: string,
}


const fixtureReducer = (state: fixtureState, action: Action): fixtureState => {
  switch (action.type) {
    case 'FIXTURE_LIST_LOADED':
      return {
        ...state,
        isLoading: false,
        isSearching: false,
        fixtures: [...action.payload.data]|| [],
        cursor: action.payload.cursor,
        clear: false,
        query: action.payload.query,
      };

      case 'FIXTURE_LIST_APPEND':
        return {
          ...state,
          isLoading: false,
          fixtures: [...state.fixtures, ...action.payload.data]|| [],
          oldCursor: state.cursor,
          cursor: action.payload.cursor,
          clear: false,
          query: action.payload.query,
        };
      
      case "REMOVE_FIXTURE":
        return {
          ...state,
          fixtures: [...state.fixtures.filter((fx) => fx.id != action.payload.id)]
        }
    
    case 'FIXTURE_SEARCH_CALL':
      return {
        ...state,
        isSearching: true,
      };
    
    case "FIXTURE_IS_LOADING":
      return {
        ...state,
        isLoading: true,
      }
    
    case 'FIXTURE_LIST_CLEAR':
      return {
        ...state,
        isLoading: false,
        fixtures: [],
        cursor: 0,
        clear: true,
        query: "",
      }

    default:
      return state;
  }
};

export {fixtureReducer};
export type userReducerType = typeof fixtureReducer;
