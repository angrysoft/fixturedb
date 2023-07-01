"use client";
import React from "react";
import { FixtureObject } from "./reducers/fixtureReducer";
import { Fixture } from "./Fixture";
import { Info } from "./components/Info";
interface IFixtureListProps {
  data: Array<FixtureObject>;
}

const FixtureList: React.FC<IFixtureListProps> = (props: IFixtureListProps) => {
  if (props.data.length === 0) {
    return (
      <Info text="Nic nie znaleziono" />
    );
  }
  return (
    <div className="grid auto-rows-min gap-1 h-full overflow-y-auto p-1">
      {props.data.map((fix) => {
        return <Fixture data={fix} key={fix.id} />;
      })}
    </div>
  );
};

export { FixtureList };
