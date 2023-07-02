"use client";
import React from "react";

interface MaterialIconsProps {
  name: string;
}

const MaterialIcons = (props: MaterialIconsProps) => {
  return (
    
    <span className="material-symbols-outlined select-none notranslate text-[1.5rem]">
      {props.name}
    </span>
  );
};


export { MaterialIcons };
