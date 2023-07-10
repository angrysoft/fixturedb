"use client";

import { signIn, useSession } from "next-auth/react";
import Loader from "../components/Loader";
import { AdminHeader } from "./components/AdminHeader";
import { SideMenu } from "./components/SideMenu";
import { MenuAction } from "./components/MenuAction";
import Table from "./components/Table";
import { SearchForm } from "../SearchForm";

const User = () => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === "loading") return <Loader />;
  return (
    <>
      <AdminHeader img={session.user?.image || ""} />
      <SearchForm />
      <div className="grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-flow-col h-full md:grid-cols-[auto_1fr]">
        <SideMenu>
          <MenuAction name="Add" url="add" />
        </SideMenu>
        <Table id="fixtures" data={[]} header={["Manufacture", "Model"]} />
      </div>
    </>
  );
};

export default User;
