import React, {
  MouseEventHandler,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { IHintsResponse } from "../add/page";
import { Label } from "./Label";
import Button from "../../components/Button";

interface IDmxModesProps {
  // label: string;
  // id: string;
  required?: boolean;
  hints?: IHintsResponse;
  listItems: Array<{ id: number; name: string }>;
}

const DmxModes: React.FC<IDmxModesProps> = (props: IDmxModesProps) => {
  const [items, setItems] = useState<Array<string>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleAddClick = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (inputRef.current && inputRef.current.value.length !== 0) {
      const newItems = new Set(items);
      newItems.add(inputRef.current.value);
      setItems(Array.from(newItems));
      inputRef.current.value = "";
    }
  };

  const handleDelClick = (item: string) => {
    const newItems = new Set(items);
    newItems.delete(item);
    setItems(Array.from(newItems));
  };

  return (
    <div className="grid gap-05 grid-cols-1 md:grid-cols-3 items-center">
      <Label for={`dmxModes-editor`} name={"DmxModes"} />
      <div className="grid gap-05 gird-cols-1 md:grid-cols-3 md:col-span-2">
        <div className="md:col-span-3 gap-05 grid grid-flow-col justify-start">
          {items.map((el, index) => (
            <DmxMode key={index} name={el} onClick={handleDelClick} />
          ))}
        </div>
        <input
          id={`dmxModes-editor`}
          // name={props.id}
          list={`datalist-dmxModes`}
          className=" w-full md:p-05 md:col-span-2
                bg-surface
                 border border-gray-300 rounded
                 focus:outline-0 focus:border-primary
                 transition-border duration-500"
          ref={inputRef}
        />
        <datalist id={`datalist-dmxModes`}>
          {props.listItems.map((item) => (
            <option key={item.id} value={item.name} />
          ))}
        </datalist>
        <Button handleClick={handleAddClick}>+</Button>
      </div>
    </div>
  );
};

interface IMultiItemProps {
  name: string;
  onClick: CallableFunction;
}

const DmxMode = (props: IMultiItemProps) => {
  return (
    <div className="grid grid-flow-col gap-05 p-05 bg-secondary rounded-lg items-center">
      <input
        id={"dmxModes"}
        name="dmxModes[]"
        value={props.name}
        readOnly
        className="hidden"
      />
      <div className="text-[1rem] text-onSecondary">{props.name}</div>
      <div
        className="cursor-pointer border border-onSecondary rounded"
        onClick={() => props.onClick(props.name)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-1 h-1 text-onSecondary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export { DmxModes };
