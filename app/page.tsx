"use client";
import { SessionProvider } from "next-auth/react";
import { useContext } from "react";
import { FixtureList } from "./FixtureList";
import { SearchForm } from "./SearchForm";
import { Header } from "./components/Header";
import { AppContext } from "./store";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
  const { state } = useContext(AppContext);

  return (
    <SessionProvider>
      <div
        className="sm:container sm:mx-auto 
                   sm:border-x-surface sm:border-x-2
                     grid grid-rows-[auto_auto_1fr]
                    bg-background h-screen relative"
      >
        <Header />
        <SearchForm />
        <FixtureList />
      </div>
    </SessionProvider>
  );
};

export default Home;
