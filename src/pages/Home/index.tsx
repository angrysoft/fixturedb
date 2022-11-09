import React from "react";
import { FixtureList } from "./FixtureList";
import { SearchForm } from "./SearchForm";

interface IHomeProps {
  children?: JSX.Element | JSX.Element[];
}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {

  return (
    <div className="grid content-baseline bg-background h-screen">
      <SearchForm />
      <FixtureList />
    </div>
  );
};

export { Home };
