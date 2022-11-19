import React from 'react';
import { useLocation } from 'react-router-dom';
import { DetailsWrapper } from './DetailsWrapper';
import { InfoItem } from './InfoItem';
import { InfoListItems } from './InfoListItems';


interface IFixtureTypeLightProps {

  children?: JSX.Element | JSX.Element[];
}


const FixtureTypeLight:React.FC<IFixtureTypeLightProps> = (props:IFixtureTypeLightProps) => {
  const {state} = useLocation();
  return (
    <DetailsWrapper manufacture={state.manufacture.name} name={state.name}>
      <div className="grid grid-flow-row">
        <InfoItem name="Waga" value={state.weight} unit="Kg" />
        <InfoItem name="Moc" value={state.power} unit="W" />
        <InfoItem name="Wejście prądowe" value={state.powerPlug.type} />
        <InfoItem name="Przelot zasilania" value={state.powerPassage ? "Tak" : "Nie"} />
        <InfoListItems name="Gniazda" items={state.connector} />
      </div>
    </DetailsWrapper>
  );
};

export {FixtureTypeLight};
