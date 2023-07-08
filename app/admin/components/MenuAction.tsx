import Link from 'next/link';
import React from 'react';


interface IMenuActionProps {
  name: string;
  url:string;
  children?: JSX.Element | JSX.Element[];
}


const MenuAction:React.FC<IMenuActionProps> = (props:IMenuActionProps) => {
  return (
    <div className=' bg-surface text-onSurface border-b border-b-primary'>
      <Link className="w-full flex p-1 text-onSurface" href={`/admin/${props.url}`}>{props.name}</Link>
    </div>
  );
};

export {MenuAction};
