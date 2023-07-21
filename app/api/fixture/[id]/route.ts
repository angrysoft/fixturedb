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
    console.log(data);
    const fixture: any = await updateFixture(data, Number(params.id));
    console.log(fixture);
    return NextResponse.json({
      data: {updated: params.id},
      status: "success",
    });
  } else {
    return NextResponse.json({error:"Access denied"}, {status:401})
  }
}

async function updateFixture(fixtureObj:{[key:string]:any}, id:number) {
  try {
    const oldFixture:any = await prisma.fixture.findUnique({
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
    console.log(oldFixture);
    for (const [key, val] of Object.entries(fixtureObj)) {
      
      console.log(key, val);
      switch (key) {
        case "manufacture":
          if (oldFixture?.manufacture.name !== fixtureObj.manufacture) {
            insertInclude("manufacture", query);
            query.data.manufacture = {
              connectOrCreate: {
                where: {name: fixtureObj.manufacture},
                create:{name: fixtureObj.manufacture},
              },
            }
          }
          break;
        case "model":
          updateMainField(oldFixture?.model, fixtureObj.model, "model", query, false);
          break;
        case "weight":
        case "power":
          if (oldFixture[key])
            updateMainField(oldFixture[key], Number(val), key, query, false);
          break;
        case "tags":
          // Tags
          insertInclude("tags", query);
          const tags = fixtureObj.tags?.split(',')
            .filter((t) => t.length !== 0)
            ?.map((tag: string)=>{
            
            return {
              where:{
                name: tag,
              },
              create: {
                name:tag,
              }
            }
          }) || [];
          query.data.tags = {
            connectOrCreate: tags
          }
          break;

        case "fixtureType":
          if (oldFixture?.fixtureType.name !== fixtureObj.fixtureType) {
            insertInclude("fixtureType", query);
            query.data.fixtureType = {
              connectOrCreate:{
                where:{
                  name: fixtureObj.type
                },
                create:{
                  name: fixtureObj.type
                }
              }
            }
          }
          break;
        
        case "powerPassage":
        case "outdoor":
          const oldVal = oldFixture.details[key];
          if (oldVal !== null || oldVal !== undefined)
            updateDetailsField(oldVal, Boolean(val), key, query, false);
          break;
      }
    }

    

    // details.connectors
    // details.powerPlug
    // details.dmxMode
    // details.desc
    console.log(JSON.stringify(query, null, 2));

    const newFixture = {} //await prisma.fixture.update(query);
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
  if (!oldValue || oldValue === newValue) return;
  if (include)
    insertInclude(name, query);
  query.data[name] = newValue;
}

const updateDetailsField = (oldValue:any, newValue:any, name:string, query:any, include:boolean) => {
  console.log(name, oldValue, newValue)
  if (oldValue === newValue) return;
  if (! query.data.details) query.data.details = {}
  console.log('up detail', oldValue, newValue, name);
  if (include) {
    if (! query.include) query.include = {};  
    if (! query.include.details) query.include.details = {};
    query.include.details[name] = true;
  }
  query.data.details[name] = newValue;
}

const insertInclude = (name: string, query:any) => {
  if (! query.include) query.include = {};
    query.include[name] = true
};