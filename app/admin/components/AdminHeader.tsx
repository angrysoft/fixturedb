import Image from 'next/image';
import React from 'react';


interface IAdminHeaderProps {
  img:string;
}


const AdminHeader:React.FC<IAdminHeaderProps> = (props:IAdminHeaderProps) => {
  return (
    <header>
      <h1>FixtureDb</h1>
      <div><Image src={props.img} alt='Profile'/></div>
    </header>
  );
};

export {AdminHeader};
