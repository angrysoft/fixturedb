"use client";
import Link from "next/link";
import useSWR from "swr";
import Button from "../../components/Button";
import { Info } from "../../components/Info";
import Loader from "../../components/Loader";
import { fetcher } from "../../utils";

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

  return (
    <div
      className="grid gap-1  content-baseline
                 h-screen w-screen
               bg-background text-onBackground"
    >
      {data.data.model}
    </div>
  );
};

export default Fixture;
