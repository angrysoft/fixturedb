import { SyntheticEvent, useContext, useRef } from "react";
import { MaterialIcons } from "./components/MaterialIcons";
import { AppContext } from "./store";

const SearchForm = () => {
  const { dispatch } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = async (ev: SyntheticEvent) => {
    dispatch({type:"FIXTURE_SEARCH_CALL"});
    ev.preventDefault();
    const formData: FormData = new FormData(ev.target as HTMLFormElement);
    const res = await fetch("/api/search", { method: "POST", body: formData });
    if (res.ok) {
      dispatch({ type: "FIXTURE_LIST_LOADED", payload: await res.json() });
    }
  };

  return (
    <form
      onSubmit={async (ev: SyntheticEvent) => await search(ev)}
      className="items-center text-onSurface border-y-primary border-y"
    >
      <div className="flex p-05 rounded-xl bg-surface">
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
          ref={inputRef}
        />
        <div
          className="text-left p-05 text-onSurface font-bold text-[2rem]"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
              inputRef.current.focus();
            }
            dispatch({ type: "FIXTURE_LIST_CLEAR" });
          }}
        >
          <MaterialIcons name="backspace" />
        </div>
      </div>
    </form>
  );
};

export { SearchForm };
