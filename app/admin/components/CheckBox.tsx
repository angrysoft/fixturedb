import React, { useEffect, useRef } from "react";
import { Label } from "./Label";

interface ICheckBoxProps {
  id: string;
  required?: boolean;
  label: string;
  checked?: boolean;
  checkboxRef?: React.RefObject<HTMLInputElement>;
}

const CheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  let inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  if (props.checkboxRef)
    inputRef = props.checkboxRef;

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
        ref={inputRef}
      />
    </div>
  );
};

export { CheckBox };
