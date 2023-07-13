"use client";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useRef, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { InputGroup } from "../components/InputGroup";
import { useSession } from "next-auth/react";
import { Label } from "../components/Label";
import Button from "../../components/Button";

interface IAddFixtureProps {
  children?: JSX.Element | JSX.Element[];
}

const ImportExport: React.FC<IAddFixtureProps> = (props: IAddFixtureProps) => {
  useSession({ required: true });
  const ref = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const [data, setData] = useState("");

  const [error, setError] = useState("");

  const sendData = async (data: string) => {
    setError("");
    const resp = await fetch("/api/fixture", { method: "POST", body: data });
    if (resp.ok) {
      return resp.json();
    } else {
      setError(`${resp.status} - ${resp.statusText}`);
    }
  };
  const getData = async () => {
    setError("");
    const resp = await fetch("/api/export");
    if (resp.ok) {
      return resp.json();
    } else {
      setError(`${resp.status} - ${resp.statusText}`);
    }
  };

  const handleExport = async (
    ev: SyntheticEvent<HTMLFormElement>,
    opts: any,
  ) => {
    ev.preventDefault();
    const data = await getData();
    const obj = URL.createObjectURL(new Blob(data, {type:"text/plain"}));
    setData(obj);
    // if (ref.current)
    //   ref.current.click();
    // URL.revokeObjectURL(obj);
  };

  return (
    <>
      <BackButton backTo="/" title={"Add New Fixture"} />
      <div className="p-1 grid">
        <InputGroup>
          <Label for={"export"} name={"Export"} />
          <a className="" href={data} ref={ref} >export</a>
          <Button id="export" handleClick={handleExport}>Export</Button>
        </InputGroup>
        <InputGroup>
          <Input
            type="file"
            label="Clean & Import"
            id="export"
            inputArgs={{ accept: ".json" }}
          />
          <Button id="export">Import</Button>
        </InputGroup>
      </div>
    </>
  );
};

export default ImportExport;
0;
