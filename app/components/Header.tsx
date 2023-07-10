import { useSession } from "next-auth/react";
import { LogOut } from "./LogOut";
import { LogIn } from "./LogIn";
import Image from "next/image";

interface IHeaderProps {
  text: string;
}
const Header: React.FC = () => {
  const { status, data: session } = useSession();

  return (
    <header className="grid grid-flow-col p-1 md:py-1 md:px-2 bg-surface justify-between h-6 relative items-center border-b-primary border-b">
      <h1>FixtureDb</h1>
      <div className="max-h-4 grid grid-flow-col gap-1 items-center relative">
        {session ? (
          <>
            <img
              className="h-3 w-auto rounded-full"
              src={session.user?.image || ""}
              alt="Profile"
            />
            <LogOut />
          </>
        ) : (
          <LogIn />
        )}
      </div>
    </header>
  );
};

export { Header };
