"use client";
import { useContext } from "react";
import { FixtureList } from "./FixtureList";
import { SearchForm } from "./SearchForm";
import { Info } from "./components/Info";
import Loader from "./components/Loader";
import { AppContext } from "./store";
import { Header } from "./components/Header";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Header />
      <SearchForm />
        {state.fixture.clear ? (
          <Info text="wpisz tekst aby wyszukać." />
        ) : state.fixture.isSearching ? (
          <Loader />
        ) : (
          <FixtureList />
        )}
    </>
  );
};

export default Home;
