import React, {
  RefObject,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { SearchFormContext } from "../pages/Home/SearchForm";

interface InputSearchProps {
  id: string;
  type: string;
  inputRef?: RefObject<HTMLInputElement>;
  required?: boolean;
  value?: any;
}

const InputSearch = (props: InputSearchProps) => {
  const form = useContext(SearchFormContext);
  const [value, setValue] = useState(form.getValue(props.id));

  useEffect(() => {
    setValue(form.getValue(props.id));
  }, [form, props.id]);

  const handleChange = (ev: SyntheticEvent) => {
    const input = ev.target as HTMLSelectElement;
    setValue(input.value);
    form.setValue(props.id, input.value);
  };

  return (
    <input
      type="text"
      id={props.id}
      name={props.id}
      className="w-full
                 bg-transparent autofill:bg-red-500
                 text-onSurface text-[2rem]
                 border-none
                 focus:outline-0 focus:border-b-primary
                 transition-border duration-500"
      value={value || ""}
      ref={props.inputRef}
      onChange={handleChange}
      placeholder="Szukaj"
    />  
  );
};

export default InputSearch;
