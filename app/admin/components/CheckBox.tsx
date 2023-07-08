import React, { useEffect, useRef } from "react";
import { Label } from "./Label";

interface ICheckBoxProps {
  id: string;
  required?: boolean;
  label: string;
  checked?: boolean;
}

const CheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (inputRef.current && props.checked)
      inputRef.current.checked = props.checked;
  }, [props.checked]);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3
                    items-center justify-items-start"
    >
      <Label for={props.id.toString()} name={props.label} />

      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        className="md:col-span-2
                   border border-gray-300 rounded
                   focus:outline-0 focus:border-primary
                   transition-border duration-500 h-2 w-2"
        required={props.required}
      />
    </div>
  );
};

export { CheckBox };
