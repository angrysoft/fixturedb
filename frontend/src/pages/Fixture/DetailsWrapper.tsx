import React from 'react';
import { BackButton } from '../../components/BackButton';


interface IDetailsWrapperProps {
  manufacture: string;
  name: string;
  children?: JSX.Element | JSX.Element[];
}


const DetailsWrapper:React.FC<IDetailsWrapperProps> = (props:IDetailsWrapperProps) => {
  return (
    <>
      <BackButton
          backTo='/'
          title={props.name}
        />
        <div className="grid gap-1 content-baseline overflow-y-auto p-2">
          {props.children}
        </div>
    </>
  );
};

export {DetailsWrapper};
