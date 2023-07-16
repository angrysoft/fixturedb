import { NextResponse } from "next/server";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

interface fixtureObjType {
  fixtureType: {
    name: string;
  }
  manufacture: {
    name: string;
  }
  model:string,
  weight:number,
  power?:number,
  tags:Array<{name:string}>,
  details: {
    powerPassage: boolean;
    connectors: Array<{name:string}>;
    dmxModes: Array<{name:string, channels: number}>;
    powerPlug: {name:string};
    outdoor: boolean;
    files?: Array<{name: string, url:string}>;
    width? : number;
    height?: number;
    thickness?: number;
    resolutionH?: number;
    resolutionV?: number;
    pixel?: number;
    desc: string;
  }
}

export async function POST(request: Request) {
  const importData:{data:Array<any>, cleanDb:boolean} = await request.json();

  if (importData.cleanDb === true) {
    console.log("cleaning db");
    const deletedFixture = prisma.fixture.deleteMany();
    const deletedType = prisma.fixtureType.deleteMany();
    const deletedManufacture = prisma.manufacture.deleteMany();
    const deletedConnector = prisma.connector.deleteMany();
    const deletedPlug = prisma.powerPlug.deleteMany();
    const deletedTag = prisma.tag.deleteMany();
    const transaction = await prisma.$transaction(
      [
        deletedFixture,
        deletedType,
        deletedManufacture,
        deletedConnector,
        deletedPlug,
        deletedTag
      ]
    );
    console.log(transaction);
  }
  
    
  const data:{added:Array<string>, conflicts:Array<string>, errors:Array<string>} = {        
      added: [],
      conflicts: [],
      errors: [],
    }

    for (const fix of importData.data) {
      const status = await importFixture(fix);
      switch(status) {
        case "added":
          data.added.push(fix);
          break;
        case "conflict":
          data.conflicts.push(fix);
          break;
        case "error":
          data.errors.push(fix);
          break;
      }
    }

  return NextResponse.json({
    data: data,
    bla: false,
    status: "success",
  });
}

async function importFixture(fixtureObj: fixtureObjType):Promise<any> {
  const tags = fixtureObj.tags?.map((tag)=>{
    return {
      where: tag,
      create: tag,
    }
  }) || [];

  const connectors = fixtureObj.details.connectors.map((conn)=>{
    return {
      where: conn,
      create: conn
    }
  }) || [];

  try {
    const fixture = await prisma.fixture.create({
      include: {
        tags: true,
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
            where:fixtureObj.fixtureType,
            create: fixtureObj.fixtureType
          }
        },
        manufacture: {
          connectOrCreate:{
            where:fixtureObj.manufacture,
            create: fixtureObj.manufacture
          }
        },
        weight: fixtureObj.weight,
        power: fixtureObj.power,
        tags: {
          connectOrCreate: tags,
        },
        details: {
        create: {
            powerPassage: fixtureObj.details.powerPassage,
            connectors: {
              connectOrCreate: connectors
            },
            dmxModes: {
              create: fixtureObj.details.dmxModes || [],
            },
            powerPlug: {
              connectOrCreate:{
                where: fixtureObj.details.powerPlug,
                create: fixtureObj.details.powerPlug
              }
            },
            outdoor: fixtureObj.details.outdoor || false,
            files: {
              create: fixtureObj.details.files || [],
            },
            desc: fixtureObj.details.desc || "",
            width: fixtureObj.details.width,
            height: fixtureObj.details.height,
            thickness: fixtureObj.details.thickness,
            resolutionH: fixtureObj.details.resolutionH,
            resolutionV: fixtureObj.details.resolutionV,
            pixel: fixtureObj.details.pixel,
          }
        },
      }
    });

    return "added";
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        // console.log(
        //   'There is a unique constraint violation'
        // )
        return 'conflict'
      }
      return "error"
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError){
      return await importFixture(fixtureObj);
    } else{
      return "error"
    }
  }
}