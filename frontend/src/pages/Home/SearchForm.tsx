import React, {
  createContext,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import InputSearch from "../../components/InputSearch";
import { MaterialIcons } from "../../components/MaterialIcons";
import { useApi } from "../../hooks/useApi";
import { AppContext } from "../../store/store";

interface ISearchFormProps {
  children?: JSX.Element | JSX.Element[];
}

interface IFormValues {
  [key: string]: any;
}

interface ISearchFromContext {
  setValue: (filedName: string, fieldValue: any) => void;
  getValue: (filedName: string) => any;
}

const SearchFormContext = createContext<ISearchFromContext>({
  setValue: () => "",
  getValue: () => "",
});

const SearchForm: React.FC<ISearchFormProps> = (props: ISearchFormProps) => {
  const { call, loading, error, results } = useApi();
  const { dispatch } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<IFormValues>({});

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!error && !loading && results) {
      dispatch({ type: "FIXTURE_LIST_LOADED", payload: results });
    }
  }, [results, error, loading, dispatch]);

  const makeQuery = (ev: SyntheticEvent, values: IFormValues) => {
    ev.preventDefault();
    dispatch({ type: "FIXTURE_SEARCH_CALL" });
    inputRef.current?.blur();
    console.log(values);
    call(`/api/v1/search/${values.query}`, { method: "GET" });
  };

  const setValue = useCallback(
    (filedName: string, fieldValue: any) =>
      setValues((vs) => {
        console.log(vs);
        
        const newValue: IFormValues = { ...vs };
        newValue[filedName] = fieldValue;
        return newValue;
      }),
    [setValues],
  );

  const getValue = useCallback(
    (filedName: string) => {
      return values[filedName];
    },
    [values],
  );

  const form = {
    setValue: setValue,
    getValue: getValue,
  };

  return (
    <form
      onSubmit={(ev: SyntheticEvent) => makeQuery(ev, values)}
      className="flex bg-surface items-center text-onSurface shadow z-10 shadow-primary"
    >
      <div
        className="text-left p-1 text-onSurface font-bold text-[2rem]"
        onClick={() =>
          dispatch({ type: "SEARCH_BAR_STATE", payload: { viewSearch: false } })
        }
      >
        <MaterialIcons name="arrow_back" />
      </div>
      <SearchFormContext.Provider value={form}>
        <InputSearch id="query" type="text" inputRef={inputRef} />
      </SearchFormContext.Provider>
    </form>
  );
};

export { SearchForm, SearchFormContext };