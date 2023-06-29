import React from 'react';
import { useLocation } from 'react-router-dom';
import { DetailsWrapper } from './DetailsWrapper';
import { InfoItem } from './InfoItem';
import { InfoListItems } from './InfoListItems';


interface IFixtureTypeLedProps {

  children?: JSX.Element | JSX.Element[];
}


const FixtureTypeLed:React.FC<IFixtureTypeLedProps> = (props:IFixtureTypeLedProps) => {
  const {state} = useLocation();

  return (
    <DetailsWrapper manufacture={state.manufacture.name} name={state.name}>
      <div className="grid grid-flow-row">
        <InfoItem name="Waga" value={state.weight} unit="Kg" />
        <InfoItem name="Moc" value={state.power} unit="W" />
        <InfoItem name="Wejście prądowe" value={state.powerPlug.type} />
        <InfoItem name="Przelot zasilania" value={state.powerPassage ? "Tak" : "Nie"} />
        <InfoListItems name="Gniazda" items={state.connector} />
        <InfoItem name="Szerokość" value={state.width} unit="mm"/>
        <InfoItem name="Wysokość" value={state.height} unit="mm"/>
        <InfoItem name="Grubość" value={state.thickness} unit="mm"/>
        <InfoItem name="Rozdzielczość Poziom" value={state.resolutionH} unit="pix"/>
        <InfoItem name="Rozdzielczość Pion" value={state.resolutionV} unit="pix"/>
        <InfoItem name="Rozstaw Pikseli" value={state.pixel} unit="mm"/>
        <InfoItem name="Zewnętrzna" value={state.outdoor ? "Tak" : "Nie"} />
      </div>
    </DetailsWrapper>
  );
};

export {FixtureTypeLed};
