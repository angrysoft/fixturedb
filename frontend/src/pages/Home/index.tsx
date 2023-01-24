import React, { useContext } from "react";
import { MaterialIcons } from "../../components/MaterialIcons";
import { AppContext } from "../../store/store";
import { FixtureList } from "./FixtureList";
import { SearchForm } from "./SearchForm";

interface IHomeProps {
  children?: JSX.Element | JSX.Element[];
}

const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
  const {state} = useContext(AppContext);
  return (
    <div className="grid content-baseline bg-background h-screen">
      {state.view.viewSearch ? <SearchForm /> : <Header />}
      <FixtureList />
    </div>
  );
};

const Header: React.FC = () => {
  const {dispatch} = useContext(AppContext);

  const handleClick = () => {
    dispatch({type: "SEARCH_BAR_STATE", payload:{viewSearch:true}})
  }

  return (
    <header className="grid grid-flow-col bg-surface items-center shadow z-10 shadow-primary">
      <h1 className="text-onSurface text-bold py-1 px-2 notranslate">FixtureDB</h1>
      <div className="text-right p-1 text-onSurface font-bold text-[2rem]" onClick={handleClick}>
        <MaterialIcons name="search" />
      </div>
    </header>
  );
}
export { Home };
