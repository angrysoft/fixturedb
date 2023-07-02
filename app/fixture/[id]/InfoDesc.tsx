import React from "react";

interface IInfoDescProps {
  text: string | null;
}

const InfoDesc: React.FC<IInfoDescProps> = (props: IInfoDescProps) => {
  if (! props.text) return <></>;

  return (
    <div className="border-b-surface border-b-2 text-onSurface py-1">
      <span className="font-bold">Opis: </span>
      <p className="">{props.text} </p>
    </div>
  );
};

export { InfoDesc };
