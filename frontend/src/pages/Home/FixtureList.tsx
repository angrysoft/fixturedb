import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Loader';
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
    setFixList(items);
  }, [state.fixture.light, state.fixture.led]);

  if (state.fixture.isLoading) {
    return <Loader />
  }
  return (
    <div className='grid gap-1 h-full overflow-y-auto p-1'>
      {fixList.length ? fixList : (
        <div
          className='text-onSurface font-bold p-1 bg-surface rounded-lg'
        >
          Nic nie znaleziono
        </div>)}
    </div>
  );
};

export {FixtureList};
