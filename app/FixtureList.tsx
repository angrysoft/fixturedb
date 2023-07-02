"use client";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Fixture } from "./Fixture";
import { Info } from "./components/Info";
import { AppContext } from "./store";
import Loader from "./components/Loader";
interface IFixtureListProps {}

const FixtureList: React.FC<IFixtureListProps> = (props: IFixtureListProps) => {
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

    console.log(observerRef.current);
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries.at(0)?.isIntersecting) {
        console.log("pull");
        pullData();
      }
    }, observerOptions);
    if (observerRef.current) {
      console.log("connect");
      observer.observe(observerRef.current);
    }

    return () => {
      console.log("disconnect");
      observer.disconnect();
    };
  }, [observerRef, pullData]);

  if (state.fixture.fixtures.length === 0) {
    return <Info text="Nic nie znaleziono" />;
  }
  return (
    <div className="grid auto-rows-min gap-1 h-full overflow-y-auto p-1">
      {state.fixture.fixtures.map((fix) => {
        return <Fixture data={fix} key={fix.id} />;
      })}
      <div className="p-1" ref={observerRef}>
        {state.fixture.isLoading && <Loader />}
      </div>
    </div>
  );
};

export { FixtureList };
