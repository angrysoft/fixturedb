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
  required?: boolean;
  hints?: IHintsResponse;
  listItems: Array<{ id: number; name: string }>;
}

const DmxModes: React.FC<IDmxModesProps> = (props: IDmxModesProps) => {
  const [items, setItems] = useState<Array<string>>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const channelRef = useRef<HTMLInputElement>(null);
  const handleAddClick = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (
      nameRef.current &&
      nameRef.current.value.length !== 0 &&
      channelRef.current &&
      channelRef.current.value.length !== 0 &&
      Number(channelRef.current.value) <= 512
    ) {
      const newItems = new Set(items);
      newItems.add(`${nameRef.current.value}:${channelRef.current.value}`);
      setItems(Array.from(newItems));
      nameRef.current.value = "";
      channelRef.current.value = "";
    }
  };

  const handleDelClick = (item: string) => {
    const newItems = new Set(items);
    newItems.delete(item);
    setItems(Array.from(newItems));
  };

  return (
    <div className="grid gap-05 grid-cols-1 md:grid-cols-3 items-center">
      <input
        id={"dmxModes"}
        name="dmxModes"
        value={items}
        readOnly
        className="hidden"
      />
      <Label for={`dmxModes-editor`} name={"DmxModes"} />
      <div className="grid gap-05 gird-cols-1 md:grid-cols-4 md:col-span-2 items-end">
        <div className="md:col-span-3 gap-05 grid grid-flow-col justify-start">
          {items.map((el, index) => (
            <DmxMode key={index} name={el} onClick={handleDelClick} />
          ))}
        </div>
        <div className="col-span-2">
          <Label name="Name" for="dmxModes-editor-name" />
          <input
            id={`dmxModes-editor-name`}
            className=" w-full md:p-05
                bg-surface
                 border border-gray-300 rounded
                 focus:outline-0 focus:border-primary
                 transition-border duration-500"
            ref={nameRef}
          />
        </div>
        <div className="">
          <Label name="Channels" for="dmxModes-editor-channel" />
          <input
            type="number"
            max={512}
            min={1}
            id={`dmxModes-editor-channel`}
            className=" w-full md:p-05
                bg-surface
                 border border-gray-300 rounded
                 focus:outline-0 focus:border-primary
                 transition-border duration-500"
            ref={channelRef}
          />
        </div>

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
