"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../components/Button";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Loader from "../components/Loader";

const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  );
};

const User = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  })
  console.log("sesion",  status);

  if (status === "loading")
    return <Loader />
  
  return (
    <>
      <h1>Client Session</h1>
      <Button handleClick={signOut}>SignOut</Button>
    </>
  );
};

export default User;
