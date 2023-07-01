"use client";
import useSWR from "swr";
import Loader from "../../components/Loader";
import { fetcher } from "../../utils";
import { useEffect, useState } from "react";
import { Info } from "../../components/Info";
import Button from "../../components/Button";
import { BackButton } from "../../components/BackButton";
import Link from "next/link";

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
          <Button >Wróć do głównej</Button>
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
