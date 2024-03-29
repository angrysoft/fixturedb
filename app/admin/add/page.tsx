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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Textarea } from "../components/Textarea";

export interface IHintsResponse {
  status: string;
  data: {
    manufactures?: Array<{ id: number; name: string }>;
    types?: Array<{ id: number; name: string }>;
    plugs?: Array<{ id: number; name: string }>;
    tags?: Array<{ id: number; name: string }>;
    connectors?: Array<{ id: number; name: string }>;
    dmxModes?: string;
  };
}

const AddFixture: React.FC = () => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const [hints, setHints] = useState<IHintsResponse>();
  const [error, setError] = useState("");
  const [detailsElement, setDetailsElement] = useState<React.JSX.Element>(
    <></>,
  );

  const sendData = async (data: string) => {
    setError("");
    const resp = await fetch("/api/fixture", { method: "POST", body: data });
    if (resp.ok) {
      return resp.json();
    } else {
      setError(`${resp.status} - ${resp.statusText}`);
    }
  };

  const handleSubmit = async (
    ev: SyntheticEvent<HTMLFormElement>,
    opts: any,
  ) => {
    ev.preventDefault();
    const data = new FormData(ev.target as HTMLFormElement);
    const jsonData = Object.fromEntries(data.entries());
    const ret = await sendData(JSON.stringify(jsonData));
    if (ret && ret.data.added) router.push(`/fixture/${ret.data.added}`);
  };

  useEffect(() => {
    const getHints = async () => {
      const res = await fetch("/api/hints");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      setHints(await res.json());
    };
    getHints();
  }, []);

  const handleFixtureTypeChange = (selectedFixtureType: string) => {
    // const sel = ev.target as HTMLSelectElement;
    switch (selectedFixtureType) {
      case "led": {
        setDetailsElement(<LedForm hints={hints} />);
        break;
      }
      case "light": {
        setDetailsElement(<LightForm hints={hints} />);
        break;
      }
      default:
        setDetailsElement(<></>);
    }
  };

  return (
    <>
      <BackButton backTo="/" title={"Add New Fixture"} />
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
          <Input
            type="number"
            label="Weight"
            id="weight"
            required
            inputArgs={{ step: "0.1" }}
          />
          <Input type="number" label="Power" id="power" />
        </InputGroup>
        <InputGroup>
          <MultiAdd
            label="Tags"
            id="tags"
            listItems={hints?.data?.tags || []}
          />
        </InputGroup>
        <InputGroup>
          <Select
            id="fixtureType"
            label="Type"
            items={hints?.data?.types || []}
            required
            onChange={handleFixtureTypeChange}
            fistEmpty
          />
        </InputGroup>
        {detailsElement}
        <Textarea label={"Desc"} id={"desc"} />
        {error.length > 0 ? (
          <InputGroup>
            <span className="text-red-500 ">{error}</span>
          </InputGroup>
        ) : (
          <></>
        )}
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
