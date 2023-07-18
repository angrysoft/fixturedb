"use client";
import { useEffect, useRef } from "react";
import { Label } from "./Label";

interface InputDatalistProps {
  id: string;
  listItems: Array<{ id: number; name: string }>;
  required?: boolean;
  label: string;
  inputArgs?: any;
  value?: any;
}

const InputDatalist = (props: InputDatalistProps) => {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (inputRef.current && props.value) inputRef.current.value = props.value;
  }, [props.value]);

  return (
    <div className="grid gap-05 grid-cols-1 md:grid-cols-3 items-center">
      <Label for={props.id} name={props.label} />
      <input
        id={props.id}
        name={props.id}
        list={`datalist-${props.id}`}
        className="md:col-span-2 w-full md:p-05
                  bg-surface
                   border border-gray-300 rounded
                   focus:outline-0 focus:border-primary
                   transition-border duration-500"
        required={props.required}
        ref={inputRef}
        {...props.inputArgs}
      />
      <datalist id={`datalist-${props.id}`}>
        {props.listItems.map((item) => (
          <option key={item.id} value={item.name} />
        ))}
      </datalist>
    </div>
  );
};

export { InputDatalist };
