'use client'
import { createContext, useReducer } from "react";
import adminReducer, { AdminState } from "./reducers/adminReducer";

const initialState: AdminState = {
  table: {}
};

interface IProviderProps {
  children: React.JSX.Element | React.JSX.Element[];
}

// const AdminContext = createContext<{
//   state: AdminState;
//   dispatch: React.Dispatch<any>;
// }>({
//   state: initialState,
//   dispatch: () => null,
// });


// const AdminProvider = (props: IProviderProps): Reac => {
//   const [state, dispatch] = useReducer(adminReducer, initialState);
//   return (
//     <AdminContext.Provider value={{ state, dispatch }}>
//       {props.children}
//     </AdminContext.Provider>
//   );
// };
const AdminProvider = (props: IProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <AdminContext.Provider value={{state, dispatch}}>
      {props.children}
    </AdminContext.Provider>
  )
}

const AdminContext = createContext(null);



export { AdminContext, AdminProvider, initialState };
