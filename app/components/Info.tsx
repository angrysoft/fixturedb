import React from "react";

interface IInfoProps {
  text: string;
}

const Info: React.FC<IInfoProps> = (props: IInfoProps) => {
  return (
    <div className="grid auto-rows-min gap-1 h-full overflow-y-auto p-1">
      <div className="p-1 font-bold rounded bg-surface text-onSurface">
        {props.text}
      </div>
    </div>
  );
};

export { Info };
