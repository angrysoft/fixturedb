import React from 'react';


interface IFixtureProps {
  manufacture: string;
  name: string;
  weight: number;
  power: number;
}


const Fixture:React.FC<IFixtureProps> = (props:IFixtureProps) => {
  return (
    <div className='grid gap-1 bg-surface rounded-lg text-onSurface p-2'>
      <h3 className='font-bold capitalize'>{props.manufacture} - {props.name}</h3>
      <div className='grid grid-flow-col'>
        <div>
          <span className='font-bold'>Waga: </span> 
          <span className='capitalize'>{props.weight} Kg</span>
        </div>
        <div>
          <span className='font-bold'>Moc: </span>
          <span>{props.power} W</span>
        </div>
      </div>
    </div>
  );
};

export {Fixture};
