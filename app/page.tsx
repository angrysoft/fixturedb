"use client";
import { useContext } from "react";
import { FixtureList } from "./FixtureList";
import { SearchForm } from "./SearchForm";
import { Info } from "./components/Info";
import Loader from "./components/Loader";
import { AppContext } from "./store";

interface IHomeProps {
}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
  const { state } = useContext(AppContext);

  return (
    <>
      <SearchForm />
      <div className="">
        {state.fixture.clear ? (
          <Info text="wpisz tekst aby wyszukać po producencie lub modelu" />
        ) : state.fixture.isSearching ? (
          <Loader />
        ) : (
          <FixtureList />
        )}
      </div>
    </>
  );
};

export default Home;
