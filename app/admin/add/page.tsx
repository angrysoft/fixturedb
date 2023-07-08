"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { Form } from "../components/Form";
import { InputGroup } from "../components/InputGroup";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { InputDatalist } from "../components/Datalist";
import { LedForm } from "../components/LedForm";
import { LightForm } from "../components/LightForm";
import { MultiAdd } from "../components/MultiAdd";

interface IAddFixtureProps {
  children?: JSX.Element | JSX.Element[];
}

export interface IHintsResponse {
  status: string;
  data: {
    manufactures?: Array<{ id: number; name: string }>;
    types?: Array<{ id: number; name: string }>;
    plugs?: Array<{ id: number; name: string }>;
    tags?: Array<{ id: number; name: string }>;
    connectors?: Array<{ id: number; name: string }>;
  };
}

const AddFixture: React.FC<IAddFixtureProps> = (props: IAddFixtureProps) => {
  const [hints, setHints] = useState<IHintsResponse>();
  const [detailsElement, setDetailsElement] = useState<React.JSX.Element>(
    <></>,
  );

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>, opts: any) => {
    ev.preventDefault();
    const data = new FormData(ev.target as HTMLFormElement);
    data.forEach((val, key) => console.log(`${key} = ${val}`));
  };

  useEffect(() => {
    const getHints = async () => {
      const res = await fetch("/api/admin/hints");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      setHints(await res.json());
    };
    getHints();
  }, []);

  const handleFixtureTypeChange = (ev: SyntheticEvent<HTMLSelectElement>) => {
    const sel = ev.target as HTMLSelectElement;
    switch (sel.value) {
      case "led": {
        setDetailsElement(<LedForm  hints={hints}/>);
        break;
      }
      case "light": {
        setDetailsElement(<LightForm hints={hints}/>);
        break;
      }
    }
  };

  return (
    <>
      <BackButton backTo="/admin" title={"Add New Fixture"} />
      <Form onSubmitHandle={handleSubmit} submitMethod="POST">
        <InputGroup>
          <InputDatalist
            label="Manufacture"
            id="manufacture"
            required
            listItems={hints?.data?.manufactures || []}
            inputArgs={{ autoComplete: "off" }}
          />
          <Input
            type="text"
            label="model"
            id="model"
            required
            inputArgs={{ autoComplete: "off" }}
          />
          <Input type="number" label="Weight" id="weight" required />
        </InputGroup>
        <InputGroup>
          <MultiAdd label="Tags" id="tags" listItems={hints?.data?.tags || []} />
        </InputGroup>
        <InputGroup>
          <Select
            id="type"
            label="Type"
            items={hints?.data?.types || []}
            required
            onChange={handleFixtureTypeChange}
            fistEmpty
          />
        </InputGroup>
        {detailsElement}
        <InputGroup>
          <input
            className="w-full p-05 rounded
                 cursor-pointer
                 text-xl font-bold text-center text-surface
                 shadow-md hover:shadow-2xl
                 bg-secondary
                 transition-all-500 transition-all duration-500
                 disabled:opacity-50 disabled:hover:shadow-none"
            type="submit"
          />
        </InputGroup>
      </Form>
    </>
  );
};

export default AddFixture;
