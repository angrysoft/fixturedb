import React from 'react';
import { Outlet } from 'react-router-dom';


const Fixture:React.FC = () => {

  return (
    <div
      className="grid gap-1  content-baseline
                 h-screen w-screen
               bg-background text-onBackground"
    >
      <Outlet />
  </div>
  );
};

export default Fixture;
