import { NextResponse } from "next/server";
import {prisma} from "../../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(request: Request, { params }: {params: {id: number}}) {
  const data = await prisma.fixture.findUnique({
    where: {
      id: Number(params.id)
    },
    include: {
      tags: true,
      fixtureType: true,
      manufacture: true,
      details: {
        include:{
          connectors: true,
          dmxModes: true,
          powerPlug:true,
          files:true,
        }
      },
    },
  });

  const result = {
    status: "success",
    message: "",
    data: data
  }
  if (data == null) {
    result.status = "fail",
    result.message = "Not found"
  }
  return NextResponse.json(result);
}

export async function DELETE(request: Request, { params }: {params: {id: number}}) {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log("delete", params.id);
    const deletedFixture = await prisma.fixture.delete({
      where: {
        id: Number(params.id),
      }
    });
    return NextResponse.json({
      data: {deleted: deletedFixture},
      status: "success",
    });
  } else {
    return NextResponse.json({error:"Access denied"}, {status:401})
  }
}

export async function PUT(request: Request,  { params }: {params: {id: number}}) {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await request.json();
    const fixture: any = await updateFixture(data, Number(params.id));
    console.log(fixture);
    return NextResponse.json({
      data: {updateed: params.id},
      status: "success",
    });
  } else {
    return NextResponse.json({error:"Access denied"}, {status:401})
  }
}

async function updateFixture(fixtureObj: any, id:number) {
  const tags = fixtureObj.tags?.split(',')?.map((tag: string)=>{
    return {
      where:{
        name: tag,
      },
      update: {
        name:tag,
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
      update: {
        name: conn,
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
    const oldFixture = await prisma.fixture.findUnique({
      where: {
        id: id
      },
      include: {
        tags: true,
        fixtureType: true,
        manufacture: true,
        details: {
          include:{
            connectors: true,
            dmxModes: true,
            powerPlug:true,
            files:true,
          }
        },
      },
    });


    let query:any = {
      where: {
        id: id,
      },
      data: {},
    };

    if (oldFixture?.manufacture.name !== fixtureObj.manufacture) {
      if (! query.include) query.include = {};
      query.include.manufacture = true;
      query.data.manufacture = {
        connectOrCreate: {
          where: {name: fixtureObj.manufacture},
          create:{name: fixtureObj.manufacture},
        },
      }
    }

    updateMainField(oldFixture?.model, fixtureObj.model, "model", query, false);
    updateMainField(oldFixture?.weight, Number(fixtureObj.weight), "weight", query, false);
    updateMainField(oldFixture?.power, Number(fixtureObj.power), "power", query, false);

    // Tags
    updateMainField(oldFixture?.fixtureType, fixtureObj.type, "fixtureType", query, true);
    // if (oldFixture?.details?.powerPassage !== fixtureObj.powerPassage) query.data.details.powerPassage = fixtureObj.powerPassage && true || false;
    // details.connectors
    // details.powerPlug
    // details.dmxMode
    // details.outdoor
    // details.desc
    console.log(query);

    const newFixture = await prisma.fixture.update(query);
    return newFixture;

  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e)
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation'
        )
      }
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError){
      await updateFixture(fixtureObj, id);
    } else{
      throw e
    }
  }
}

const updateMainField = (oldValue:any, newValue:any, name:string, query:any, include:boolean) => {
  if (oldValue !== newValue) {
    query.data[name] = newValue;
  }
  if (include) {
    if (! query.include) query.include = {};
    query.include[name] = true
  }
}
const updateDetailsField = (oldValue:any, newValue:any, name:string, query:any, include:boolean) => {
  if (oldValue !== newValue) {
    query.data.details[name] = newValue;
  }
  if (include) {
    if (! query.include) query.include = {};
    query.include[name] = true
  }
}