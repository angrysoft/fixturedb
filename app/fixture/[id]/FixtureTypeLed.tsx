import React from "react";
import { InfoItem } from "./InfoItem";
import { InfoListItems } from "./InfoListItems";
import { FixtureObjectDetails } from "./page";
import { InfoFileList } from "./InfoFilesList";
import { InfoDesc } from "./InfoDesc";

interface IFixtureTypeLedProps {
  data: FixtureObjectDetails;
}

const FixtureTypeLed: React.FC<IFixtureTypeLedProps> = (
  props: IFixtureTypeLedProps,
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
      <InfoItem name="Szerokość" value={details.width} unit="mm" />
      <InfoItem name="Wysokość" value={details.height} unit="mm" />
      <InfoItem name="Grubość" value={details.thickness} unit="mm" />
      <InfoItem
        name="Rozdzielczość Poziom"
        value={details.resolutionH}
        unit="pix"
      />
      <InfoItem
        name="Rozdzielczość Pion"
        value={details.resolutionV}
        unit="pix"
      />
      <InfoItem name="Rozstaw Pikseli" value={details.pixel} unit="mm" />
      <InfoItem name="Zewnętrzna" value={details.outdoor ? "Tak" : "Nie"} />
      <InfoFileList files={details.files} />
      <InfoDesc text={details.desc} />
      <InfoListItems horizontal name="Tagi" items={props.data.tags} />
    </div>
  );
};

export { FixtureTypeLed };
