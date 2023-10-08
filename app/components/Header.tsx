import { useSession } from "next-auth/react";
import { LogOut } from "./LogOut";
import { LogIn } from "./LogIn";
import Image from "next/image";
import Link from "next/link";

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
            <Link className="cursor-pointer" href={"/admin/importexport"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3 text-onSurface"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </Link>
            <LogOut />
            <Image
              priority
              width={96}
              height={96}
              className="h-3 w-auto rounded-full"
              src={session.user?.image || ""}
              alt="Profile"
            />
          </>
        ) : (
          <LogIn />
        )}
      </div>
    </header>
  );
};

export { Header };
