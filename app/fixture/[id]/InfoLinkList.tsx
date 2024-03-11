import Link from "next/link";
import React from "react";

interface IInfoFileListProps {
  links: string;
}

const InfoLinkList: React.FC<IInfoFileListProps> = (
  props: IInfoFileListProps,
) => {
  if (props.links.length === 0) return <></>;

  const items = props.links?.split(",").map((el: string) => {
    const [name, url] = el.split("=>");
    if (!name || !url) return;
    return (
      <div key={url} className="py-05 pl-1">
        <Link className="text-primary" href={url}>
          <span className="font-bold">{name} </span>
        </Link>
      </div>
    );
  });
  return (
    <div className="border-b-surface border-b-2 text-onSurface py-1">
      <div className="font-bold">Linki:</div>
      <div>{items}</div>
    </div>
  );
};

export { InfoLinkList };
