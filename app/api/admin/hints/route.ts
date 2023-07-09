import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = {
      manufactures: await prisma.manufacture.findMany(),
      types: await prisma.fixtureType.findMany(),
      plugs: await prisma.powerPlug.findMany(),
      connectors: await prisma.connector.findMany(),
      tags: await prisma.tag.findMany(),
    }                                   
    return NextResponse.json({
      data: data,
      status: "success",
    });
  } else {
    return NextResponse.json({error:"Access denied"}, {status:401})
  }
}