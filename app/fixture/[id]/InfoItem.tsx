import React from "react";

interface IInfoItemProps {
  name: string;
  value: any | null;
  unit?: string;
}

const InfoItem: React.FC<IInfoItemProps> = (props: IInfoItemProps) => {
  if (! props.value) return <></>;

  return (
    <div className="border-b-surface border-b-2 text-onSurface py-1">
      <span className="font-bold">{props.name}: </span>
      <span className="capitalize">{props.value} </span>
      <span>{props.unit}</span>
    </div>
  );
};

export { InfoItem };
