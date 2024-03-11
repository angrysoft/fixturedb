import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { Label } from "./Label";

interface ILinksProps {
  value?: Array<string>;
}

const Links: React.FC<ILinksProps> = (props: ILinksProps) => {
  console.log("links ", props.value);
  const [items, setItems] = useState<Array<string>>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const handleAddClick = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (
      nameRef.current &&
      nameRef.current.value.length !== 0 &&
      urlRef.current &&
      urlRef.current.value.length !== 0
    ) {
      const newItems = new Set(items);
      newItems.add(`${nameRef.current.value}=>${urlRef.current.value}`);
      setItems(Array.from(newItems));
      nameRef.current.value = "";
      urlRef.current.value = "";
    }
  };

  useEffect(() => {
    setItems(props.value ?? []);
  }, [props.value]);

  const handleDelClick = (item: string) => {
    const newItems = new Set(items);
    newItems.delete(item);
    setItems(Array.from(newItems));
  };

  return (
    <div className="grid gap-05 grid-cols-1 md:grid-cols-3 items-center">
      <input
        id={"links"}
        name="links"
        value={items}
        multiple
        readOnly
        className="hidden"
      />
      <Label for={`links-editor`} name={"links"} />
      <div className="grid gap-05 gird-cols-1 md:grid-cols-3 col-span-3 md:col-span-2 items-end">
        <div className="gap-05 grid col-span-3">
          {items.map((el, index) => (
            <LinkItem key={index} name={el} onClick={handleDelClick} />
          ))}
        </div>

        <div className="grid gap-05 col-span-3">
          <div className="">
            <Label name="Name" for="links-editor-name" />
            <input
              id={`links-editor-name`}
              className=" w-full md:p-05
                bg-surface
                 border border-gray-300 rounded
                 focus:outline-0 focus:border-primary
                 transition-border duration-500"
              ref={nameRef}
            />
          </div>

          <div className="">
            <Label name="Url" for="links-editor-url" />
            <input
              type="url"
              id={`links-editor-url`}
              className=" w-full md:p-05
                bg-surface
                 border border-gray-300 rounded
                 focus:outline-0 focus:border-primary
                 transition-border duration-500"
              ref={urlRef}
            />
          </div>

          <Button handleClick={handleAddClick}>+</Button>
        </div>
      </div>
    </div>
  );
};

interface IMultiItemProps {
  name: string;
  onClick: CallableFunction;
}

const LinkItem = (props: IMultiItemProps) => {
  if (! props.name) return null;
  return (
    <div className="grid grid-flow-col gap-05 p-05 bg-secondary rounded-lg items-center justify-between">
      <div className="text-[1rem] text-onSecondary">{props.name}</div>
      <div
        className="cursor-pointer border border-onSecondary rounded"
        onClick={() => props.onClick(props.name)}
        role="none"
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

export { Links };
