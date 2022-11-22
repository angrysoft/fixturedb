import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FixtureTypeLight,
  FixtureTypeLed,
} from "../../reducers/fixtureReducer";

interface IFixtureProps {
  data: FixtureTypeLight | FixtureTypeLed;
}

interface IFixtureInfoProps {
  manufacture: string;
  name: string;
  weight: number;
  power?: number;
}

const Fixture: React.FC<IFixtureProps> = (props: IFixtureProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(props.data)
    navigate(`/fixture/${props.data.type}`, {state: props.data})
  }

  return (
    <div
      className="grid gap-1 bg-surface rounded-lg text-onSurface p-2"
      onClick={handleClick}
    >
      <FixtureInfo
        manufacture={props.data.manufacture.name}
        name={props.data.name}
        weight={props.data.weight}
        power={props.data.power}
      />
    </div>
  );
};

const FixtureInfo: React.FC<IFixtureInfoProps> = (props: IFixtureInfoProps) => {
  return (
    <>
      <h3 className="font-bold capitalize">
        {props.manufacture} - {props.name}
      </h3>
      <div className="grid grid-flow-col">
        <div>
          <span className="font-bold">Waga: </span>
          <span className="capitalize">{props.weight} Kg</span>
        </div>
        {props.power && (
          <div>
            <span className="font-bold">Moc: </span>
            <span className="capitalize">{props.power} W</span>
          </div>
        )}
      </div>
    </>
  );
};

export { Fixture };
