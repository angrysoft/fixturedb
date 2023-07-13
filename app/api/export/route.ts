import { NextResponse } from "next/server";
import { prisma } from "../prisma";
import fs from "fs";

export async function GET(request: Request) {
  
  let dbQuery:any = {
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

  return NextResponse.json(await prisma.fixture.findMany(dbQuery));
}