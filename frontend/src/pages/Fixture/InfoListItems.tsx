import React from 'react';


interface IInfoListItemProps {
  name: string;
  items: Array<any>;
}

const InfoListItems:React.FC<IInfoListItemProps> = (props:IInfoListItemProps) => {
  const items = props.items.map((item) => {
    return (
      <div key={item.ID} className='text-onSurface py-05 pl-1'>
        <span className="font-bold">{item.name} </span>
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

export {InfoListItems};
