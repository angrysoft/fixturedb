import React from "react";
import Link from "next/link";
import { FixtureObject } from "./reducers/fixtureReducer";
import { ManageIcons } from "./components/ManageIcons";
interface IFixtureProps {
  data: FixtureObject;
  edit: boolean;
}

const Fixture: React.FC<IFixtureProps> = (props: IFixtureProps) => {
  return (
    <Link
      className="grid gap-1 bg-surface rounded-lg text-onSurface p-2"
      href={"/fixture/" + props.data.id}
    >
      <h3 className="font-bold capitalize grid grid-flow-col">
        {props.data.manufacture.name} - {props.data.model}
        {props.edit && <ManageIcons fixture={props.data.id}/>}
      </h3>
      <div className="grid grid-flow-col">
        <div>
          <span className="font-bold">Waga: </span>
          <span className="capitalize">{props.data.weight} Kg</span>
        </div>
        {props.data.power && (
          <div>
            <span className="font-bold">Moc: </span>
            <span className="capitalize">{props.data.power} W</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export { Fixture };
