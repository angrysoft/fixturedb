import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/store';
import {Fixture} from './Fixture';

interface IFixtureListProps {
}


const FixtureList:React.FC<IFixtureListProps> = (props:IFixtureListProps) => {
  const {state} = useContext(AppContext)
  const [fixList, setFixList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const items = state.fixture.list.map((fix) => {
        return <Fixture data={fix} key={fix.ID}/>
      });
    setFixList(items);
  }, [state.fixture.list]);

  return (
    <div className='grid gap-1 h-full overflow-y-auto p-1'>
      {fixList}
    </div>
  );
};

export {FixtureList};
