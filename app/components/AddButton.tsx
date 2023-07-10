import Link from "next/link";
import React from "react";

const AddButton: React.FC = () => {
  return (
    <>
      <div className="p-05 absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-secondary rounded-full">
        <Link href={"/admin/add"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-2 h-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export { AddButton };
