// 'use client'
// import React, {
//   createContext,
//   SyntheticEvent,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import InputSearch from "./components/InputSearch";
// import { MaterialIcons } from "./components/MaterialIcons";
// // import { useApi } from "./hooks/useApi";
// import { AppContext } from "./store";

import { SyntheticEvent, useContext } from "react";
import { MaterialIcons } from "./components/MaterialIcons";
import { AppContext } from "./store";
import { data } from "autoprefixer";

// interface ISearchFormProps {
//   children?: JSX.Element | JSX.Element[];
// }

// interface IFormValues {
//   [key: string]: any;
// }

// interface ISearchFromContext {
//   setValue: (filedName: string, fieldValue: any) => void;
//   getValue: (filedName: string) => any;
// }

// const SearchFormContext = createContext<ISearchFromContext>({
//   setValue: () => "",
//   getValue: () => "",
// });

// const SearchForm: React.FC<ISearchFormProps> = (props: ISearchFormProps) => {
//   const { call, loading, error, results } = useApi();
//   const { dispatch } = useContext(AppContext);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [values, setValues] = useState<IFormValues>({});

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   useEffect(() => {
//     if (!error && !loading && results) {
//       dispatch({ type: "FIXTURE_LIST_LOADED", payload: results });
//     }
//   }, [results, error, loading, dispatch]);

//   const makeQuery = (ev: SyntheticEvent, values: IFormValues) => {
//     ev.preventDefault();
//     dispatch({ type: "FIXTURE_SEARCH_CALL" });
//     inputRef.current?.blur();
//     console.log(values);
//     call(`/api/v1/search/${values.query}`, { method: "GET" });
//   };

//   const setValue = useCallback(
//     (filedName: string, fieldValue: any) =>
//       setValues((vs) => {
//         console.log(vs);

//         const newValue: IFormValues = { ...vs };
//         newValue[filedName] = fieldValue;
//         return newValue;
//       }),
//     [setValues],
//   );

//   const getValue = useCallback(
//     (filedName: string) => {
//       return values[filedName];
//     },
//     [values],
//   );

//   const form = {
//     setValue: setValue,
//     getValue: getValue,
//   };

//   return (
//     <form
//       onSubmit={(ev: SyntheticEvent) => makeQuery(ev, values)}
//       className="flex bg-surface items-center text-onSurface shadow z-10 shadow-primary"
//     >
//       <div
//         className="text-left p-1 text-onSurface font-bold text-[2rem]"
//         onClick={() => {
//           dispatch({ type: "SEARCH_BAR_STATE", payload: { viewSearch: false } });
//           dispatch({ type: "FIXTURE_LIST_CLEAR" });
//         }
//         }
//       >
//         <MaterialIcons name="arrow_back" />
//       </div>
//       <SearchFormContext.Provider value={form}>
//         <InputSearch id="query" type="text" inputRef={inputRef} />
//       </SearchFormContext.Provider>
//     </form>
//   );
// };

// export { SearchForm, SearchFormContext };

// function useApi(): { call: any; loading: any; error: any; results: any; } {
//   throw new Error("Function not implemented.");
// }

const search = async (ev:SyntheticEvent) => {
  ev.preventDefault();
  const formData: FormData = new FormData(ev.target as HTMLFormElement);
  console.log(formData, formData.get("query"));
  const res = await fetch("/api/search", {method:"POST", body:formData});
  if (res.ok) {
    console.log(await res.json())
  }
}

const SearchForm = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <form
      onSubmit={async (ev: SyntheticEvent) => await search(ev)}
      className="flex bg-surface items-center text-onSurface shadow z-10 shadow-primary"
    >
      <input
        id="query"
        name="query"
        type="text"
        className="w-full p-05
                 bg-transparent autofill:bg-red-500
                 text-onSurface text-[2rem]
                 border-none
                 focus:outline-0 focus:border-b-primary
                 transition-border duration-500"
        placeholder="Szukaj"
      />
      <div
        className="text-left p-05 text-onSurface font-bold text-[2rem]"
        onClick={() => {
          dispatch({
            type: "SEARCH_BAR_STATE",
            payload: { viewSearch: false },
          });
          dispatch({ type: "FIXTURE_LIST_CLEAR" });
        }}
      >
        <MaterialIcons name="backspace" />
      </div>
    </form>
  );
};

export { SearchForm };
