import React from 'react';


interface IInfoListItemProps {
  name: string;
  items: Array<{id:number, name:string}>;
  horizontal?: boolean
}

const InfoListItems:React.FC<IInfoListItemProps> = (props:IInfoListItemProps) => {
  if (props.items.length === 0)
    return <></>
    
  const items = props.items.map((item) => {
    return (
      <div key={item.id} className='text-onSurface py-05 pl-1'>
        <span className="font-bold">{item.name} </span>
      </div>
    );
  });

  return (
    <div className='border-b-surface border-b-2 text-onSurface py-1'>
      <div className="font-bold">{props.name}:</div>
      <div className={"grid" + (props.horizontal ? " grid-flow-col": " grid-flow-row")}>
        {items}
      </div>
    </div>
  );
};

export {InfoListItems};
