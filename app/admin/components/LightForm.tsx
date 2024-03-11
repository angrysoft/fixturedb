import React from "react";
import { IHintsResponse } from "../add/page";
import { CheckBox } from "./CheckBox";
import { InputDatalist } from "./Datalist";
import { DmxModes } from "./DmxModes";
import { InputGroup } from "./InputGroup";
import { MultiAdd } from "./MultiAdd";
import { Links } from "./Links";

interface ILightFormProps {
  hints?: IHintsResponse;
  data?: any;
}

const LightForm: React.FC<ILightFormProps> = (props: ILightFormProps) => {
  return (
    <>
      <InputGroup>
        <MultiAdd
          label="Connectors"
          id="connectors"
          listItems={props.hints?.data.connectors || []}
          value={props.data?.details.connectors?.map(
            (con: { id: number; name: string }) => con.name,
          )}
        />
        <CheckBox
          id="powerPassage"
          label="Power Passage"
          checked={props.data?.details.powerPassage || false}
        />
        <InputDatalist
          id="powerPlug"
          label="Power Plug"
          listItems={props.hints?.data.plugs || []}
          required
          value={props.data?.details.powerPlug.name}
        />
      </InputGroup>
      <InputGroup>
        <DmxModes
          listItems={[]}
          value={props.data?.details.dmxModes.split(",").map((mode: string) => {
            const [name, channels] = mode.split(":");
            return `${name}:${channels}`;
          })}
        />
      </InputGroup>

      <InputGroup>
        <CheckBox
          id="outdoor"
          label="Outdoor"
          checked={props.data?.details.outdoor}
        />
      </InputGroup>
      <InputGroup>
        <Links value={props.data?.details.links?.split(",")} />
      </InputGroup>
    </>
  );
};

export { LightForm };
