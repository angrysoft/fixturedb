"use client";
import React, {
  ChangeEventHandler,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  onChange?: CallableFunction;
  value?: string;
  inputRef?: React.RefObject<HTMLSelectElement>;
}

const Select: React.FC<ISelectProps> = (props: ISelectProps) => {
  const [selected, setSelected] = useState("");

  const handleChange = (ev: SyntheticEvent<HTMLSelectElement>) => {
    const sel = ev.target as HTMLSelectElement;
    setSelected(sel.value);
    props.onChange && props.onChange(sel.value);
  };

  useEffect(() => {
    if (props.value) {
      setSelected(props.value);
    }
  }, [props.value]);

  const optionItems = useMemo(() => {
    return props.items.map((item) => {
      return (
        <option id={item.id.toString()} value={item.name} key={item.id}>
          {item.name}
        </option>
      );
    });
  }, [props.items]);

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
        onChange={handleChange}
        value={selected}
      >
        {props.fistEmpty && <option></option>}
        {optionItems}
      </select>
    </div>
  );
};

export { Select };
