import React from 'react';


interface IInfoDmxModeProps {
  name: string;
  items: Array<{ID:number, mode:string, channels:number}>;
}

const InfoDmxModes:React.FC<IInfoDmxModeProps> = (props:IInfoDmxModeProps) => {
  const items = props.items.map((item) => {
    return (
      <div key={item.ID} className='text-onSurface py-05 pl-1'>
        <span className="font-bold">{item.mode} - </span>
        <span className="font-bold">{item.channels} ch</span>
      </div>
    );
  });
  return (
    <div className='border-b-surface border-b-2 text-onSurface py-1'>
      <div className="font-bold">{props.name}:</div>
      <div>
        {items}
      </div>
    </div>
  );
};

export {InfoDmxModes};
