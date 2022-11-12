import React from 'react';
import {Fixture} from './Fixture';

interface IFixtureListProps {

  children?: JSX.Element | JSX.Element[];
}


const FixtureList:React.FC<IFixtureListProps> = (props:IFixtureListProps) => {
  return (
    <div className='grid gap-1 h-full overflow-y-auto p-1'>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
      <Fixture manufacture='Martin'  name="Mac Aura" weight={10} power={200}/>
    </div>
  );
};

export {FixtureList};
