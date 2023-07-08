import React from "react";

interface ILabelProps {
  for: string;
  name: string;
}

const Label: React.FC<ILabelProps> = (props: ILabelProps) => {
  return (
    <>
      <label htmlFor={props.for} className="font-bold text-onSurface">
        {props.name}:
      </label>
    </>
  );
};

export { Label };
