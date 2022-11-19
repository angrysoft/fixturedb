import React from "react";
import { useNavigate } from "react-router-dom";
import { MaterialIcons } from "./MaterialIcons";

interface IBackButton {
  backTo: string;
  onClick?: CallableFunction;
  title?: string;
}

const BackButton: React.FC<IBackButton> = (props: IBackButton) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    } else {
      navigate(props.backTo, { replace: true });
    }
  };

  return (
    <div className="grid grid-cols-5 text-onSurface bg-surface">
      <span className="cursor-pointer p-2" onClick={handleClick}>
        <MaterialIcons name="arrow_back" />
      </span>
      <h1 className="text-center font-bold text-xl col-span-3 py-2">
        {props.title}
      </h1>
    </div>
  );
};

export { BackButton };