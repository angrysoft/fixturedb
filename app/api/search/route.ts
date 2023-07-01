import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const query:string =  (await request.formData()).get("query")?.toString() || "";
  const data = await prisma.fixture.findMany({
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
        manufacture: {
          name: "asc",
        }
      },
      {
        model: "asc",
      }
    ]
  })
  return NextResponse.json({status:"success", data:data});

}