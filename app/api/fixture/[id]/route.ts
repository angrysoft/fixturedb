import { NextResponse } from "next/server";
import {prisma} from "../../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

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

export async function DELETE(request: Request, { params }: {params: {id: number}}) {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log("delete", params.id);
    const deletedFixture = await prisma.fixture.delete({
      where: {
        id: Number(params.id),
      }
    });
    console.log(deletedFixture)
    return NextResponse.json({
      data: {deleted: deletedFixture},
      status: "success",
    });
  } else {
    return NextResponse.json({error:"Access denied"}, {status:401})
  }
}