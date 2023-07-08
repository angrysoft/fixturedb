"use client";

import { useEffect, useRef } from "react";
import { Label } from "./Label";

interface InputProps {
  id: string;
  type: string;
  required?: boolean;
  label: string;
  inputArgs?: any;
  value?: any;
}

const Input = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (inputRef.current && props.value) inputRef.current.value = props.value;
  }, [props.value]);

  return (
    <div className="grid gap-05 grid-cols-1 md:grid-cols-3 items-center">
      <Label for={props.id.toString()} name={props.label} />
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        className="md:col-span-2 w-full md:p-05
                  bg-surface
                   border border-gray-300 rounded
                   focus:outline-0 focus:border-primary
                   transition-border duration-500"
        required={props.required}
        ref={inputRef}
        {...props.inputArgs}
      />
    </div>
  );
};

export { Input };
