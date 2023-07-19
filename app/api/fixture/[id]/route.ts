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

    if (oldFixture?.model !== fixtureObj.model) query.data.model = fixtureObj.model;
    if (oldFixture?.weight !== fixtureObj.weight) query.data.weight = Number(fixtureObj.weight);
    if (oldFixture?.power !== fixtureObj.power) query.data.power = Number(fixtureObj.power);
    // Tags
    // Type
    // details.powerPassage
    // details.connectors
    // details.powerPlug
    // details.dmxMode
    // details.outdoor
    // details.desc

    const newFixture = await prisma.fixture.update(query);
      // include: {
      //   tags: true,
      //   manufacture: true,
      //   fixtureType:true,
      //   details:{
      //     include: {
      //       connectors: true,
      //     }
      //   }
      // },
      // where: {
      //   id: id
      // },
      // data: {
      //   model: fixtureObj.model,
      //   fixtureType: {
      //     update:{
      //       update:{
      //         name: fixtureObj.type
      //       },
      //       create: {
      //         name: fixtureObj.type
      //       }
      //     }
      //   },
      //   manufacture: {
      //     upsert:{
      //       update:{
      //         name: fixtureObj.manufacture
      //       },
      //       create:{
      //         name: fixtureObj.manufacture
      //       }
      //     }
      //   },
      //   weight: Number(fixtureObj.weight),
      //   power: Number(fixtureObj.power) || null,
      //   tags: {
      //     upsert: tags,
      //   },
        // details: {
        //   update: {
        //     data: {
        //       powerPassage: fixtureObj.powerPassage && true || false,
              // connectors: {
              //   connectOrCreate: connectors
              // },
              // dmxModes: {
              //   connectOrCreate: dmxModes || [],
              // },

              // powerPlug: {
              //   connectOrCreate:{
              //     where:{
              //       name: fixtureObj.powerPlug
              //     },
              //     create:{
              //       name: fixtureObj.powerPlug
              //     }
              //   }
              // },
              // outdoor: fixtureObj.outdoor && true || false,
              // files: {
              //   create: fixtureObj.files || [],
              // },
              // desc: fixtureObj.desc || "",
              // width: Number(fixtureObj.width) || null,
              // height: Number(fixtureObj.height) || null,
              // thickness: Number(fixtureObj.thickness) || null,
              // resolutionH: Number(fixtureObj.resolutionH) || null,
              // resolutionV: Number(fixtureObj.resolutionV) || null,
              // pixel: Number(fixtureObj.pixel) || null,
            // }
          // }
        // },
      // }
    // });
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