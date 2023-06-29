interface IFixtureInfoProps {
  manufacture: string;
  name: string;
  weight: number;
  power?: number;
}

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

export { FixtureInfo };
