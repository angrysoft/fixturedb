import React, { useEffect, useState } from 'react';
import { useFixtureList } from '../../hooks/fixture';


interface IHomeProps {

  children?: JSX.Element | JSX.Element[];
}


const Home:React.FC<IHomeProps> = (props:IHomeProps) => {
  const { getList } = useFixtureList();
  // const {items, setItems} = useState([]);

  useEffect(() => {
    getList().then((snapshot)=> {
      // console.log(snapshot.docs[0].data());
      console.log(snapshot.docs[snapshot.docs.length-1]);
      snapshot.forEach((item) => console.log(item.data()));
    });

  },[]);

  return (
    <div className='grid'>
      
    </div>
  );
};

export {Home};
