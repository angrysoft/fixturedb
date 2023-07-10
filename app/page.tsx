"use client";
import { SessionProvider } from "next-auth/react";
import { useContext } from "react";
import { FixtureList } from "./FixtureList";
import { SearchForm } from "./SearchForm";
import { Header } from "./components/Header";
import { Info } from "./components/Info";
import Loader from "./components/Loader";
import { AppContext } from "./store";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
  const { state } = useContext(AppContext);

  return (
    <SessionProvider>
      <div
        className="md:container md:mx-auto 
                   md:border-x-surface md:border-x-2
                     grid grid-rows-[auto_auto_1fr]
                    bg-background h-screen"
      >
        <Header />
        <SearchForm />
        <FixtureList />
      </div>
    </SessionProvider>
  );
};

export default Home;
