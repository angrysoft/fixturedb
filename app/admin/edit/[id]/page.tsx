"use client";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { BackButton } from "../../../components/BackButton";
import { Form } from "../../components/Form";
import { InputGroup } from "../../components/InputGroup";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { InputDatalist } from "../../components/Datalist";
import { LedForm } from "../../components/LedForm";
import { LightForm } from "../../components/LightForm";
import { MultiAdd } from "../../components/MultiAdd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "../../../components/Loader";
import { json } from "stream/consumers";

interface IEditFixtureProps {
  params: { id: number };
}

export interface IHintsResponse {
  status: string;
  data: {
    manufactures?: Array<{ id: number; name: string }>;
    types?: Array<{ id: number; name: string }>;
    plugs?: Array<{ id: number; name: string }>;
    tags?: Array<{ id: number; name: string }>;
    connectors?: Array<{ id: number; name: string }>;
    dmxModes?: Array<{ id: number; name: string }>;
  };
}

const EditFixture: React.FC<IEditFixtureProps> = (props: IEditFixtureProps) => {
  useSession({ required: true });

  const router = useRouter();
  const [hints, setHints] = useState<IHintsResponse>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailsElement, setDetailsElement] = useState<React.JSX.Element>(
    <></>,
  );
  const [fixture, setFixture] = useState<any>({});

  const sendData = async (data: string) => {
    setError("");
    const resp = await fetch(`/api/fixture/${props.params.id}`, {
      method: "PUT",
      body: data,
    });
    if (resp.ok) {
      return resp.json();
    } else {
      setError(`${resp.status} - ${resp.statusText}`);
    }
  };

  const handleSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.target as HTMLFormElement);
    const jsonData = Object.fromEntries(data.entries());
    const ret = await sendData(JSON.stringify(jsonData));
    console.log(ret);
    // if (ret.data.added) router.push(`/fixture/${ret.data.added}`);
  };

  useEffect(() => {
    const getHints = async () => {
      setLoading(true);
      const res = await fetch("/api/hints");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      setHints(await res.json());
      setLoading(false);
    };
    getHints();
  }, []);

  useEffect(() => {
    const getFixture = async () => {
      const res = await fetch(`/api/fixture/${props.params.id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setFixture(data.data);
    };
    getFixture();
  }, [props.params.id]);

  const setFixtureType = useCallback(
    (fType: string) => {
      switch (fType) {
        case "led": {
          setDetailsElement(<LedForm hints={hints} data={fixture} />);
          break;
        }
        case "light": {
          setDetailsElement(<LightForm hints={hints} data={fixture} />);
          break;
        }
        default:
          setDetailsElement(<></>);
      }
    },
    [fixture, hints],
  );

  const handleFixtureTypeChange = (sel: string) => {
    setFixtureType(sel);
  };

  useEffect(() => {
    if (fixture?.fixtureType?.name) setFixtureType(fixture.fixtureType.name);
  }, [fixture, setFixtureType]);

  if (loading) {
    return (
      <div className="grid h-screen place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <BackButton backTo="/" title={"Edit Fixture"} />
      <Form onSubmitHandle={handleSubmit} submitMethod="POST">
        <InputGroup>
          <InputDatalist
            label="Manufacture"
            id="manufacture"
            required
            listItems={hints?.data?.manufactures || []}
            inputArgs={{ autoComplete: "off" }}
            value={fixture?.manufacture?.name}
          />
          <Input
            type="text"
            label="model"
            id="model"
            required
            inputArgs={{ autoComplete: "off" }}
            value={fixture.model || ""}
          />
          <Input
            type="number"
            label="Weight"
            id="weight"
            required
            value={fixture.weight}
            inputArgs={{ step: "0.1" }}
          />
          <Input type="number" label="Power" id="power" value={fixture.power} />
        </InputGroup>
        <InputGroup>
          <MultiAdd
            label="Tags"
            id="tags"
            listItems={hints?.data?.tags || []}
            value={fixture?.tags?.map((el: { name: any }) => el.name) || []}
          />
        </InputGroup>
        <InputGroup>
          <Select
            id="type"
            label="Type"
            items={hints?.data?.types || []}
            required
            onChange={handleFixtureTypeChange}
            fistEmpty
            value={fixture?.fixtureType?.name || ""}
          />
        </InputGroup>
        {detailsElement}
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

export default EditFixture;
