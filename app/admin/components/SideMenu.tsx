import React, { ReactNode } from 'react';

interface ISideMenu {
  children: React.JSX.Element | React.JSX.Element[];
}
const SideMenu:React.FC<ISideMenu> = (props: ISideMenu) => {
  return (
    <div className="grid grid-flow-row items-start border-r border-r-surface md:h-full md:min-w-[10rem]">
      {props.children}
    </div>
  );
};

export {SideMenu};
