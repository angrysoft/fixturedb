import React from "react";
import { MaterialIcons } from "./MaterialIcons";

interface ISearchButton {
  onClick?: CallableFunction;
  title?: string;
}

const SearchButton: React.FC<ISearchButton> = (props: ISearchButton) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button onClick={handleClick} className="text-onSurface bg-transparent">
      <MaterialIcons name="search" />
    </button>
  );
};

export { SearchButton };