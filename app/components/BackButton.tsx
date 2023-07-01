import React from "react";
import { MaterialIcons } from "./MaterialIcons";
import { useRouter } from "next/router";
import Link from "next/link";

interface IBackButton {
  backTo: string;
  onClick?: CallableFunction;
  title?: string;
}

const BackButton: React.FC<IBackButton> = (props: IBackButton) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    } else {
    }
  };

  return (
    <div className="grid grid-cols-5 text-onSurface bg-surface">
      <Link className="cursor-pointer p-1 text-[2rem]" href={props.backTo}>
        <MaterialIcons name="arrow_back" />
      </Link>
      <h1 className="text-center font-bold col-span-3 py-1">{props.title}</h1>
    </div>
  );
};

export { BackButton };
