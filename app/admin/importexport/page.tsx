"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useContext, useRef, useState } from "react";
import { BackButton } from "../../components/BackButton";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { AppContext } from "../../store";
import { CheckBox } from "../components/CheckBox";
import { Input } from "../components/Input";
import { InputGroup } from "../components/InputGroup";
import { Label } from "../components/Label";

interface IAddFixtureProps {
  children?: JSX.Element | JSX.Element[];
}

const ImportExport: React.FC<IAddFixtureProps> = (props: IAddFixtureProps) => {
  useSession({ required: true });
  const {dispatch} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [error, setError] = useState("");

  const sendData = async (data: string) => {
    setError("");
    const resp = await fetch("/api/import", { method: "POST", body: data });
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
    const _data = await getData();

    if (ref.current) {
      ref.current.href =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(_data));
      ref.current.click();
    }
  };

  const handleImport = async (
    ev: SyntheticEvent<HTMLFormElement>,
    opts: any,
  ) => {
    ev.preventDefault();
    setLoading(true);

    if (!fileRef.current) return;

    let data: any = {
      cleanDb: checkboxRef?.current?.checked || false,
      data: {},
    };
    
    if (fileRef.current.files && fileRef.current.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", async (event: any) => {
        const status = await sendData(
          JSON.stringify({ ...data, ...JSON.parse(event?.target?.result) }),
        );
        setLoading(false);
        if (status.data.added.length > 0) {
          dispatch({type: "FIXTURE_LIST_LOADED", payload: {data:status.data.added, query:"Imported"}});
          router.push("/");
        }
      });
      reader.readAsText(fileRef?.current?.files[0]);
    } else {
      fileRef.current?.setCustomValidity("File is not set");
      fileRef.current.reportValidity();
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <BackButton backTo="/" title={"Import / Export Fixture"} />
      <div className="p-1 grid">
        <InputGroup>
          <Label for={"export"} name={"Export"} />
          <a className="hidden" ref={ref} download={"export.json"}>
            export
          </a>
          <Button id="export" handleClick={handleExport}>
            Export
          </Button>
        </InputGroup>
        <InputGroup>
          <CheckBox label="Clean DB" id="cleanDb" checkboxRef={checkboxRef} />
          <Input
            type="file"
            label="Clean & Import"
            id="export"
            inputArgs={{ accept: ".json" }}
            inputRef={fileRef}
          />
          <Button id="export" handleClick={handleImport}>
            Import
          </Button>
        </InputGroup>
      </div>
    </>
  );
};

export default ImportExport;
0;
