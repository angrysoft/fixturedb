import React from "react";
import { InfoDesc } from "./InfoDesc";
import { InfoDmxModes } from "./InfoDmxModes";
import { InfoFileList } from "./InfoFilesList";
import { InfoItem } from "./InfoItem";
import { InfoListItems } from "./InfoListItems";
import { FixtureObjectDetails } from "./page";

interface IFixtureTypeLightProps {
  data: FixtureObjectDetails;
}

const FixtureTypeLight: React.FC<IFixtureTypeLightProps> = (
  props: IFixtureTypeLightProps,
) => {
  const details = props.data.details;
  return (
    <div className="grid grid-flow-row">
      <InfoItem name="Waga" value={props.data.weight} unit="Kg" />
      <InfoItem name="Moc" value={props.data.power} unit="W" />
      <InfoItem name="Wejście prądowe" value={details.powerPlug?.name} />
      <InfoItem
        name="Przelot zasilania"
        value={details.powerPassage ? "Tak" : "Nie"}
      />
      <InfoListItems name="Gniazda" items={details.connectors} />
      <InfoDmxModes name="Dmx Mode" items={details.dmxModes} />
      <InfoFileList files={details.files} />
      <InfoDesc text={details.desc} />
      <InfoListItems horizontal name="Tagi" items={props.data.tags} />
    </div>
  );
};

export { FixtureTypeLight };
