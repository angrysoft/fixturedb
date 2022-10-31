import React, { useEffect, useState } from 'react';
import { useFixtureList } from '../../hooks/useFixtureRepository';


interface IHomeProps {

  children?: JSX.Element | JSX.Element[];
}


const Home:React.FC<IHomeProps> = (props:IHomeProps) => {
  const { getList } = useFixtureList();
  // const {items, setItems} = useState([]);

  useEffect(() => {
    getList().then((el)=> {})

  },[]);

  return (
    <div className='grid'>
      
    </div>
  );
};

export {Home};
