"use client";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Fixture } from "./Fixture";
import { Info } from "./components/Info";
import { AppContext } from "./store";
import Loader from "./components/Loader";
import { useSession } from "next-auth/react";
import { AddButton } from "./components/AddButton";
interface IFixtureListProps {}

const FixtureList: React.FC<IFixtureListProps> = (props: IFixtureListProps) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(AppContext);
  const observerRef = useRef<HTMLDivElement>(null);

  const pullData = useCallback(async () => {
    if (
      state.fixture.oldCursor === state.fixture.cursor ||
      state.fixture.isLoading
    )
      return;
    dispatch({ type: "FIXTURE_IS_LOADING" });
    const data = {
      query: state.fixture.query,
      cursor: state.fixture.cursor,
      items: 5,
    };
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      dispatch({ type: "FIXTURE_LIST_APPEND", payload: await res.json() });
    }
  }, [
    dispatch,
    state.fixture.cursor,
    state.fixture.isLoading,
    state.fixture.oldCursor,
    state.fixture.query,
  ]);

  useEffect(() => {
    const observerOptions: Object = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries.at(0)?.isIntersecting) {
        pullData();
      }
    }, observerOptions);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerRef, pullData]);

  let listBody = <></>;

  if (state.fixture.clear) listBody = <Info text="wpisz tekst aby wyszukać." />;
  else if (state.fixture.fixtures.length === 0)
    listBody = <Info text="Nic nie znaleziono" />;
  else if (state.fixture.isSearching) return <Loader />;
  else {
    listBody = (
      <>
        {state.fixture.fixtures.map((fix) => {
          return <Fixture data={fix} key={fix.id} />;
        })}
        <div className="p-1" ref={observerRef}>
          {state.fixture.isLoading && <Loader />}
        </div>{" "}
      </>
    );
  }
  return (
    <div className="grid auto-rows-min gap-1 h-full overflow-y-auto p-1">
      {listBody}
      {session && <AddButton />}
    </div>
  );
};

export { FixtureList };
