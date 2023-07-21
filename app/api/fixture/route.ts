import { NextResponse } from "next/server";
import {prisma} from "../prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

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

async function addFixture(fixtureObj: any) {
  const tags = fixtureObj.tags?.split(',')?.map((tag: string)=>{
    return {
      where:{
        name: tag,
      },
      create: {
        name:tag,
      }
    }
  }) || [];

  const connectors = fixtureObj.connectors?.split(',').map((conn: string)=> {
    return {
      where: {
        name: conn
      },
      create: {
        name: conn
      }
    }
  }) || [];


  const dmxModes = fixtureObj.dmxModes?.split(',')?.map((dmx: string) => {
    const [name, channel] = dmx.split(':');
    return {
      name: name,
      channels: Number(channel),
    }
  }) || [];

  try {
    const fixture = await prisma.fixture.create({
      include: {
        tags: true,
        manufacture: true,
        fixtureType:true,
        details:{
          include: {
            connectors: true,
          }
        }
      },
      data: {
        model: fixtureObj.model,
        fixtureType: {
          connectOrCreate:{
            where:{
              name: fixtureObj.fixtureType
            },
            create:{
              name: fixtureObj.fixtureType
            }
          }
        },
        manufacture: {
          connectOrCreate:{
            where:{
              name: fixtureObj.manufacture
            },
            create:{
              name: fixtureObj.manufacture
            }
          }
        },
        weight: Number(fixtureObj.weight),
        power: Number(fixtureObj.power) || null,
        tags: {
          connectOrCreate: tags,
        },
        details: {
        create: {
            powerPassage: fixtureObj.powerPassage && true || false,
            connectors: {
              connectOrCreate: connectors
            },
            dmxModes: {
              create: dmxModes || [],
            },
            powerPlug: {
              connectOrCreate:{
                where:{
                  name: fixtureObj.powerPlug
                },
                create:{
                  name: fixtureObj.powerPlug
                }
              }
            },
            outdoor: fixtureObj.outdoor && true || false,
            files: {
              create: fixtureObj.files || [],
            },
            desc: fixtureObj.desc || "",
            width: Number(fixtureObj.width) || null,
            height: Number(fixtureObj.height) || null,
            thickness: Number(fixtureObj.thickness) || null,
            resolutionH: Number(fixtureObj.resolutionH) || null,
            resolutionV: Number(fixtureObj.resolutionV) || null,
            pixel: Number(fixtureObj.pixel) || null,
          }
        },
      }
    });
    return fixture;

  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e)
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation'
        )
      }
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError){
      await addFixture(fixtureObj);
    } else{
      throw e
    }
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await request.json();
    const fixture: any = await addFixture(data);
    console.log(fixture);
    return NextResponse.json({
      data: {added: fixture.id},
      status: "success",
    });
  } else {
    return NextResponse.json({error:"Access denied"}, {status:401})
  }
}