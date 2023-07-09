import React from "react";
import { Label } from "./Label";

interface ITextareaProps {
  label: string;
  id: string;
  children?: JSX.Element | JSX.Element[];
}

const Textarea: React.FC<ITextareaProps> = (props: ITextareaProps) => {
  return (
    <>
      <div className="grid gap-05 grid-cols-1 md:grid-cols-3 items-center">
        <Label for={props.id.toString()} name={props.label} />
        <textarea
          className="md:col-span-2 w-full md:p-05
                  bg-surface
                   border border-gray-300 rounded
                   focus:outline-0 focus:border-primary
                   transition-border duration-500"
          name={props.label}
          id={props.id}
          cols={30}
          rows={10}
        ></textarea>
      </div>
    </>
  );
};

export { Textarea };
