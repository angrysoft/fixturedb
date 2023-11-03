import React from "react";
import { InputGroup } from "./InputGroup";
import { CheckBox } from "./CheckBox";
import { InputDatalist } from "./Datalist";
import { IHintsResponse } from "../add/page";
import { Input } from "./Input";
import { MultiAdd } from "./MultiAdd";

interface ILedFormProps {
  values?: any;
  hints?: IHintsResponse;
  children?: JSX.Element | JSX.Element[];
  data?: any;
}

const LedForm: React.FC<ILedFormProps> = (props: ILedFormProps) => {
  return (
    <>
      <InputGroup>
        <CheckBox
          id="powerPassage"
          label="Power Passage"
          checked={props.data?.details.powerPassage}
        />
        <MultiAdd
          label="Connectors"
          id="connectors"
          listItems={props.hints?.data.connectors || []}
          value={props.data?.connectors?.map(
            (con: { id: number; name: string }) => con.name,
          )}
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
        <Input id="width" type="number" label="Width" required value={props.data?.details.width}/>
        <Input id="height" type="number" label="Height" required value={props.data?.details.height}/>
        <Input id="thickness" type="number" label="Thickness" required value={props.data?.details.thickness}/>
      </InputGroup>
      <InputGroup>
        <Input id="resolutionH" type="number" label="ResolutionH" required value={props.data?.details.resolutionH}/>
        <Input id="resolutionV" type="number" label="ResolutionV" required value={props.data?.details.resolutionV}/>
        <Input
          id="pixel"
          type="number"
          label="Pixel"
          inputArgs={{ step: 0.01 }}
          required
          value={props.data?.details.pixel}
        />
      </InputGroup>
      <InputGroup>
        <CheckBox
          id="outdoor"
          label="Outdoor"
          checked={props.data?.details.outdoor}
        />
      </InputGroup>
    </>
  );
};

export { LedForm };
