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
    <div
      className="md:container md:mx-auto 
                   md:border-x-surface md:border-x-2
                     grid grid-rows-[auto_auto_1fr]
                    bg-background h-screen"
    >
      <Header />
      <SearchForm />
      {state.fixture.clear ? (
        <Info text="wpisz tekst aby wyszukać." />
      ) : state.fixture.isSearching ? (
        <Loader />
      ) : (
        <FixtureList />
      )}
    </div>
  );
};

export default Home;
