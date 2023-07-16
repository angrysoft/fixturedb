import { NextResponse } from "next/server";
import { prisma } from "../prisma";

interface fixtureObjType {
  id: number;
  fixtureTypeId: number;
  manufactureId: number;
  fixtureType: {
    id: number;
    name: string;
  }
  manufacture: {
    id: number;
    name: string;
  }
  model:string,
  details: {
    id: number;
    powerPassage: boolean;
    connectors: Array<{id:number, name:string}>;
    dmxModes: Array<{id:number, name:string, channels: number}>;
    powerPlug: {id: number, name:string};
    powerPlugId: number;
    outdoor: boolean;
    files: Array<{id:number, name: string, url:string}>;
  }
}

export async function GET(request: Request) {
  
  let dbQuery:any = {
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
    orderBy: [
      {
        model: "asc"
      }
    ]
  };

  let result:any = {
    data: await prisma.fixture.findMany(dbQuery),
    status: "success"
  }


  result.data = result.data.map((el:fixtureObjType) => {
    let newEl:any = {...el};
    delete newEl.id;
    delete newEl["fixtureTypeId"];
    delete newEl["manufactureId"];
    delete newEl.fixtureType.id;
    delete newEl.manufacture.id;
    delete newEl.details;

    newEl.details = Object.fromEntries(
      Object.entries(el.details).filter(([key, val])=> {
        const toSkip = ["id", "fixtureDetailsId", "powerPlugId", "fixtureId"]
        if (toSkip.includes(key.toString()))
          return false;
        return val !== null;
      }));
    
      newEl?.details?.connectors.forEach((el: any) => {
          delete el.id;
      });
    
      newEl?.tags.forEach((el: any) => {
          delete el.id;
      });

      newEl?.details?.dmxModes.forEach((el: any) => {
          delete el.id;
          delete el.fixtureDetailsId;
          
      });

      newEl?.details?.files.forEach((el: any) => {
          delete el.id;
          delete el.fixtureDetailsId;
          
      });

      delete newEl.details.powerPlug.id;

    return newEl;
  });

  

  return NextResponse.json(result);
}