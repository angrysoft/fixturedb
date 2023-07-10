import { NextResponse } from "next/server";
import {prisma} from "../../../prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let cursor: number = Number(searchParams.get("cursor")) || 0;
  const items: number = Number(searchParams.get("items"))|| 5;
  
  let dbQuery:any = {
    take: items,
    include: {
      tags: true,
      fixtureType: true,
      manufacture: true,
    },
    orderBy: [
      {
        id: "asc"
      }
    ]
  };
    if (cursor > 0) {
      dbQuery.skip = 1;
      dbQuery["cursor"] = {id: cursor};
    }
  const data = await prisma.fixture.findMany(dbQuery);
  if (data.length >0) {
    cursor = data.at(-1)?.id || 0;
  }
  return NextResponse.json({status:"success", data:data, cursor:cursor});

}