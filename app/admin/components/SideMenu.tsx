import React, { ReactNode } from 'react';

interface ISideMenu {
  children: React.JSX.Element | React.JSX.Element[];
}
const SideMenu:React.FC<ISideMenu> = (props: ISideMenu) => {
  return (
    <div className="grid grid-flow-row items-start border-r border-r-surface h-full min-w-[10rem]">
      {props.children}
    </div>
  );
};

export {SideMenu};
