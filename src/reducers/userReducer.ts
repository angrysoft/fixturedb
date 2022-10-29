import { Action } from ".";

type User = {};

export type userState = {
   user: User,
   isLoading: boolean,
}


const userReducer = (state: userState, action: Action): userState => {
  switch (action.type) {
    case 'USER_LOGGED':
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.results));
      return {user: action.payload.results, isLoading: false};
    case "USER_LOGOUT":
      localStorage.clear();
      return {user: action.payload, isLoading: false};

    default:
      return state;
  }
};

export {userReducer};
export type userReducerType = typeof userReducer;
