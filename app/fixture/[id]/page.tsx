"use client";
import Link from "next/link";
import useSWR from "swr";
import { BackButton } from "../../components/BackButton";
import Button from "../../components/Button";
import { Info } from "../../components/Info";
import Loader from "../../components/Loader";
import { FixtureObject } from "../../reducers/fixtureReducer";
import { fetcher } from "../../utils";
import { FixtureTypeLight } from "./FixtureTypeLight";
import { FixtureTypeLed } from "./FixtureTypeLed";

export interface FixtureObjectDetails extends FixtureObject {
  details: {
    powerPassage: boolean;
    connectors: Array<Connectors>;
    dmxModes: Array<DmxMode>;
    powerPlug: {
      id: number;
      name: string;
    } | null;
    outdoor: boolean;
    files: DownloadFile[];
    desc: string;
    width: number | null;
    height: number | null;
    thickness: number | null;
    resolutionH?: number | null;
    resolutionV?: number | null;
    pixel?: number | null;
  };
}

interface Connectors {
  id: number;
  name: string;
}

interface DmxMode {
  id: number;
  name: string;
  channels: number;
}

interface DownloadFile {
  id: number;
  name: string;
  url: string;
}

const Fixture = ({ params }: { params: { id: number } }) => {
  const { data, error, isLoading } = useSWR(
    `/api/fixture/${params.id}`,
    fetcher,
  );

  if (data?.status === "fail")
    return (
      <div className="grid h-screen place-content-center">
        <Info text="Nic nie znaleziono" />
        <Link href="/">
          <Button>Wróć do głównej</Button>
        </Link>
      </div>
    );

  if (isLoading) {
    return (
      <div className="h-screen place-content-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen place-content-center">
        <Info text="Coś poszło nie tak" />
      </div>
    );
  }

  let details = <></>;
  switch (data.data.fixtureType.name) {
    case "light": {
      details = <FixtureTypeLight data={data.data} />;
      break;
    }
    case "led": {
      details = <FixtureTypeLed data={data.data} />;
      break;
    }
  }

  return (
    <div
            className="md:container md:mx-auto 
                   md:border-x-surface md:border-x-2
                     grid grid-rows-[auto_auto_1fr]
                    bg-background h-screen"
    >
      <BackButton backTo="/" title={data.data.model} />
      <div className="grid gap-1 content-baseline overflow-y-auto p-2">
        {details}
      </div>
    </div>
  );
};

export default Fixture;
