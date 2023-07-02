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
      <Link
        className="grid items-center cursor-pointer p-1 text-[2rem] text-onSurface"
        href={props.backTo}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-2 h-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </Link>
      <h2 className="text-center font-bold col-span-3 py-1">{props.title}</h2>
    </div>
  );
};

export { BackButton };
