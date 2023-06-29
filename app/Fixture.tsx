import React from "react";
// import { useNavigate } from "react-router-dom";
import { FixtureTypeLight, FixtureTypeLed } from "./reducers/fixtureReducer";
import { FixtureInfo } from "./components/FixtureInfo";
import Link from "next/link";

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
  // const navigate = useNavigate();

  const handleClick = () => {
    console.log(props.data);
    // navigate(`/fixture/${props.data.type}`, {state: props.data})
  };

  return (
    <div
      className="grid gap-1 bg-surface rounded-lg text-onSurface p-2"
      onClick={handleClick}
    >
      <Link href={"/fixture/"}>
        <FixtureInfo
          manufacture={props.data.manufacture.name}
          name={props.data.name}
          weight={props.data.weight}
          power={props.data.power}
        />
      </Link>
    </div>
  );
};

export { Fixture };
