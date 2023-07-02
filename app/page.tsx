"use client";
import { useContext } from "react";
import { FixtureList } from "./FixtureList";
import { Header } from "./components/Header";
import { SearchForm } from "./SearchForm";
import Loader from "./components/Loader";
import { FixtureObject } from "./reducers/fixtureReducer";
import { AppContext } from "./store";
import { Info } from "./components/Info";

interface IHomeProps {
  children?: JSX.Element | JSX.Element[];
}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
  const { state } = useContext(AppContext);
  let fixturesData: Array<FixtureObject> = [];

  return (
    <>
      <SearchForm />
      <div className="">
        {state.fixture.clear ? (
          <Info text="wpisz tekst aby wyszukać po producencie lub modelu" />
        ) : state.fixture.isLoading ? (
          <Loader />
        ) : (
          <FixtureList data={state.fixture.fixtures} />
        )}
      </div>
    </>
  );
};

export default Home;
