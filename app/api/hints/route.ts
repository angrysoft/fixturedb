import { NextResponse } from "next/server";
import { prisma } from "../prisma";



export async function GET(request: Request) {
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
}