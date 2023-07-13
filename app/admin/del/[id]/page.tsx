"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { BackButton } from "../../../components/BackButton";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import { useSession } from "next-auth/react";
import { AppContext } from "../../../store";

const DeleteFixture: React.FC<{ params: { id: number } }> = ({
  params,
}: {
  params: { id: number };
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setErorr] = useState("");
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const { dispatch } = useContext(AppContext);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch(`/api/fixture/${params.id}`, { method: "DELETE" });
    if (res.ok) {
      dispatch({type: "REMOVE_FIXTURE", payload: {id: Number(params.id)}})
      
      router.push("/");
    } else {
      setErorr(`${res.status} - ${res.statusText}`);
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
