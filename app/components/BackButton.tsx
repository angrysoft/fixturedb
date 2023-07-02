import React from "react";
import { MaterialIcons } from "./MaterialIcons";
import Link from "next/link";

interface IBackButton {
  backTo: string;
  title?: string;
}

const BackButton: React.FC<IBackButton> = (props: IBackButton) => {
  return (
    <div className="grid grid-cols-5 items-center text-onSurface bg-surface border-b-primary border-b">
      <Link className="grid items-center cursor-pointer p-1 text-[2rem] text-onSurface" href={props.backTo}>
        <MaterialIcons name="arrow_back" />
      </Link>
      <h2 className="text-center font-bold col-span-3 py-1">{props.title}</h2>
    </div>
  );
};

export { BackButton };
