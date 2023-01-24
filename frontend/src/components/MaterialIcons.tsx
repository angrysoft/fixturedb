import React from 'react';


interface MaterialIconsProps {
  name: string;
}


const MaterialIcons = (props:MaterialIconsProps) => {
  return (
    <span className='material-icons leading-1 notranslate'>{props.name}</span>
  );
};

export {MaterialIcons};