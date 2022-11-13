import React from "react";
import { FixtureModel } from "../../reducers/fixtureReducer";

interface IFixtureProps {
  data: FixtureModel;
}

const Fixture: React.FC<IFixtureProps> = (props: IFixtureProps) => {
  return (
    <div className="grid gap-1 bg-surface rounded-lg text-onSurface p-2">
      <h3 className="font-bold capitalize">
        {props.data.manufacture.name} - {props.data.name}
      </h3>
      <div className="grid grid-flow-col">
        <div>
          <span className="font-bold">Waga: </span>
          <span className="capitalize">{props.data.weight} Kg</span>
        </div>
        <div>
          <span className="font-bold">Moc: </span>
          <span>{props.data.power} W</span>
        </div>
      </div>
    </div>
  );
};

export { Fixture };
