"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../components/Button";
import Loader from "../components/Loader";

const User = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === "loading") return <Loader />;

  return (
    <>
      <h1>Client Session</h1>
      <Button handleClick={signOut}>SignOut</Button>
    </>
  );
};

export default User;
