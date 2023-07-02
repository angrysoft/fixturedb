import Link from "next/link";
import React from "react";

interface IInfoFileListProps {
  files: Array<{ id: number; name: string; url: string }>;
}

const InfoFileList: React.FC<IInfoFileListProps> = (
  props: IInfoFileListProps,
) => {
  if (props.files.length === 0) return <></>;

  const items = props.files.map((file) => {
    return (
      <div key={file.id} className="py-05 pl-1">
        <Link className="text-primary" href={file.url}>
          <span className="font-bold">{file.name} </span>
        </Link>
      </div>
    );
  });
  return (
    <div className="border-b-surface border-b-2 text-onSurface py-1">
      <div className="font-bold">Pliki:</div>
      <div>{items}</div>
    </div>
  );
};

export { InfoFileList };
