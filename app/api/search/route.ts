import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const inputData = await request.json();
  const query:string =  inputData.query || "";
  let cursor: number = inputData.cursor || 0;
  const items: number = inputData.items|| 5;
  
  let dbQuery:any = {
    take: items,
    include: {
      tags: true,
      fixtureType: true,
      manufacture: true,
    },
    where:{
      OR:[
        {
          model: {
            contains: query,
          }
        },
        {
          manufacture:{
            name: {
              contains: query
            },
          }
        },
        {
          tags: {
            some: {
              name: {
                contains: query
              }
            }
          }
        }
      ]
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
  return NextResponse.json({status:"success", data:data, cursor:cursor, query:query});

}