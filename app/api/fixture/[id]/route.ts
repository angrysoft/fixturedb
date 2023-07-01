import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: {params: {id: number}}) {
  const data = await prisma.fixture.findUnique({
    where: {
      id: Number(params.id)
    },
    include: {
      tags: true,
      fixtureType: true,
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