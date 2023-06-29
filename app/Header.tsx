import { useContext } from "react";
import { MaterialIcons } from "./components/MaterialIcons";
import { AppContext } from "./store";

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

export {Header};