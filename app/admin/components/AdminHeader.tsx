import { signOut } from "next-auth/react";
import React from "react";

interface IAdminHeaderProps {
  img: string;
}

const AdminHeader: React.FC<IAdminHeaderProps> = (props: IAdminHeaderProps) => {
  return (
    <header className="grid grid-flow-col p-1 md:py-1 md:px-2 bg-surface justify-between h-6 relative items-center border-b-primary border-b">
      <h1>FixtureDb</h1>
      <div className="max-h-4 grid grid-flow-col gap-1 items-center">
        <img
          className="h-3 w-auto rounded-full"
          src={props.img}
          alt="Profile"
        />
        <div onClick={() => signOut()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 h-3 text-onSurface"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export { AdminHeader };
