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
}

const LedForm: React.FC<ILedFormProps> = (props: ILedFormProps) => {
  return (
    <>
      <InputGroup>
        <CheckBox id="powerPassage" label="Power Passage" />
        <MultiAdd
          label="Connectors"
          id="connectors"
          listItems={props.hints?.data.connectors || []}
        />
        <InputDatalist
          id="powerPlug"
          label="Power Plug"
          listItems={props.hints?.data.plugs || []}
          required
        />
      </InputGroup>
      <InputGroup>
        <Input id="width" type="number" label="Width" required />
        <Input id="height" type="number" label="Height" required />
        <Input id="thickness" type="number" label="Thickness" required />
      </InputGroup>
      <InputGroup>
        <Input id="resolutionH" type="number" label="ResolutionH" required />
        <Input id="resolutionV" type="number" label="ResolutionV" required />
        <Input
          id="pixel"
          type="number"
          label="Pixel"
          inputArgs={{ step: 0.01 }}
          required
        />
      </InputGroup>
      <InputGroup>
        <CheckBox id="outdoor" label="Outdoor" />
      </InputGroup>
    </>
  );
};

export { LedForm };
