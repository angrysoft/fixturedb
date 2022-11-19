import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/store';
import {Fixture} from './Fixture';

interface IFixtureListProps {
}


const FixtureList:React.FC<IFixtureListProps> = (props:IFixtureListProps) => {
  const {state} = useContext(AppContext)
  const [fixList, setFixList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const items = state.fixture.light.map((fix) => {
      return <Fixture data={fix} key={`light-${fix.ID}`}/>
    });
    items.push(...state.fixture.led.map((fix) => {
      return <Fixture data={fix} key={`led-${fix.ID}`}/>
    }));
    console.log('items', items);
    setFixList(items);
  }, [state.fixture.light, state.fixture.led]);

  return (
    <div className='grid gap-1 h-full overflow-y-auto p-1'>
      {fixList}
    </div>
  );
};

export {FixtureList};
