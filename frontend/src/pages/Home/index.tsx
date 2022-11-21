import React from "react";
import { FixtureList } from "./FixtureList";
import { SearchForm } from "./SearchForm";

interface IHomeProps {
  children?: JSX.Element | JSX.Element[];
}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {

  return (
    <div className="grid content-baseline bg-background h-screen">
      <h1 className="text-onBackground text-bold text-center p-1 bg-surface">FixtureDB</h1>
      <SearchForm />
      <FixtureList />
    </div>
  );
};

export { Home };
