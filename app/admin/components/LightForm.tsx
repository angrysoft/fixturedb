import React from "react";
import { IHintsResponse } from "../add/page";
import { InputGroup } from "./InputGroup";
import { MultiAdd } from "./MultiAdd";
import { CheckBox } from "./CheckBox";
import { InputDatalist } from "./Datalist";
import { Input } from "./Input";
import { DmxModes } from "./DmxModes";
import { Textarea } from "./Textareea";

interface ILightFormProps {
  hints?: IHintsResponse;
}

const LightForm: React.FC<ILightFormProps> = (props: ILightFormProps) => {
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
        <DmxModes listItems={[]} />
      </InputGroup>
      
      <InputGroup>
        <CheckBox id="outdoor" label="Outdoor" />
      </InputGroup>
      <Textarea label={"Desc"} id={"desc"} />
    </>
  );
};

export { LightForm };
