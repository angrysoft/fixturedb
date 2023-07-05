import { SyntheticEvent, useContext, useEffect, useRef } from "react";
import { ClearIcon } from "./components/ClearIcon";
import { AppContext } from "./store";

const SearchForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = async (ev: SyntheticEvent) => {
    dispatch({ type: "FIXTURE_SEARCH_CALL" });
    ev.preventDefault();
    const data = {
      query: inputRef?.current?.value || "",
      cursor: 0,
      items: 10,
    };
    const formData: FormData = new FormData(ev.target as HTMLFormElement);
    if (formData.get("query")?.length === 0) return;
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      inputRef?.current?.blur();
      dispatch({ type: "FIXTURE_LIST_LOADED", payload: await res.json() });
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = state.fixture.query;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={async (ev: SyntheticEvent) => await search(ev)}
      className="items-center text-onSurface border-b-primary border-b"
    >
      <div className="flex px-1 py-05 bg-surface">
        <input
          id="query"
          name="query"
          type="text"
          className="w-full p-05
                  bg-transparent autofill:bg-red-500
                  text-onSurface text-[2rem]
                  border-none
                  focus:outline-0 focus:border-b-primary
                  "
          placeholder="Szukaj"
          ref={inputRef}
        />
        <div
          className="text-left p-05 grid place-content-center"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
              inputRef.current.focus();
            }
            dispatch({ type: "FIXTURE_LIST_CLEAR" });
          }}
        >
          <ClearIcon />
          {/* <MaterialIcons name="backspace" /> */}
        </div>
      </div>
    </form>
  );
};

export { SearchForm };
