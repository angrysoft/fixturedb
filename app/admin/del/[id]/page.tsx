"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BackButton } from "../../../components/BackButton";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";

const DeleteFixture: React.FC<{ params: { id: number } }> = ({
  params,
}: {
  params: { id: number };
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setErorr] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/del/${params.id}`, { method: "POST" });
    if (res.ok) {
      router.push("/");
    } else {
      setErorr(`${res}`);
    }

    setLoading(false);
  };

  if (error.length > 0) {
    return (
      <>
        <BackButton backTo="/" title={"Back to Home"} />
        <div className="grid p-1 rounded bg-surface h-full w-full place-content-center">
          Something was wrong sorry. {error}
        </div>
      </>
    );
  }

  return (
    <>
      <BackButton backTo="/" title={"Delete Fixture ?"} />
      <div className="grid p-1 rounded bg-surface h-full w-full place-content-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid p-1">
            <Button handleClick={handleClick}>Confirm</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteFixture;
