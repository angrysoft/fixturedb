import React from "react";

interface IInfoDmxModeProps {
  name: string;
  items: string;
}

const InfoDmxModes: React.FC<IInfoDmxModeProps> = (
  props: IInfoDmxModeProps,
) => {
  const items = props.items.split(",").map((item) => {
    const [name, channels] = item.split(":");
    if (!name || !channels) return;

    return (
      <div key={item} className="text-onSurface py-05 pl-1">
        <span className="font-bold">{name} - </span>
        <span className="font-bold">{channels} ch</span>
      </div>
    );
  });

  return (
    <div className="border-b-surface border-b-2 text-onSurface py-1">
      <div className="font-bold">{props.name}:</div>
      <div>{items}</div>
    </div>
  );
};

export { InfoDmxModes };
