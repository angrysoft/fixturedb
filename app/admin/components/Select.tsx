"use client";
import React, { ChangeEventHandler } from "react";
import { Label } from "./Label";

export interface IOptions {
  id: number;
  name: string;
}

interface ISelectProps {
  id: string;
  label: string;
  items: Array<IOptions>;
  required?: boolean;
  fistEmpty?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const Select: React.FC<ISelectProps> = (props: ISelectProps) => {
  const optionItems = props.items.map((item) => {
    return (
      <option id={item.id.toString()} value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center">
      <Label for={props.id.toString()} name={props.label} />

      <select
        className="p-05 bg-surface text-onSurface
                   border border-gray-100 rounded
                   focus:outline-0 focus:border-primary"
        name={props.label.toLowerCase()}
        id={props.id}
        required={props.required}
        onChange={props.onChange && props.onChange}
      >
        {props.fistEmpty && <option></option>}
        {optionItems}
      </select>
    </div>
  );
};

export { Select };
